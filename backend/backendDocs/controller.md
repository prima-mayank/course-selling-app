# Controllers — Short & Useful Reference

User — POST /api/users/register (public)
- Body: { name: string, email: string, password: string } (all required)
- Passwords are hashed with bcrypt (salt rounds = 10)
- Success: 201 { success, message, user: { id, name, email, role } }
- Errors: 400 missing fields, 409 email exists, 500 server error

User — POST /api/users/login (public)
- Body: { email: string, password: string }
- Returns a JWT (payload { id, role }, expiresIn: 7d). Requires `process.env.JWT_SECRET`.
- Success: 200 { success, message, token, user }
- Errors: 400 missing fields, 401 invalid credentials, 500 server error

Courses — GET /api/courses (public)
- Returns only published courses (isPublished = true)
- Success: 200 { success, count, courses }

Courses — GET /api/courses/:id (public)
- Returns a published course by id
- Errors: 404 not found (or not published), 400/500 for invalid id/DB errors

Courses — POST /api/courses (auth)
- Protected: requires authenticated user (middleware sets `req.user.id`)
- Body: { title: string, description: string, price: number, thumbnail?: string }
- Creates course as draft (not published)
- Success: 201 { success, message, course }
- Errors: 400 missing fields, 401 unauthorized, 500 server error

Courses — PATCH /api/courses/:id/publish (auth)
- Protected: should be limited to the course instructor or admin (use RBAC)
- Sets isPublished = true and saves
- Success: 200 { success, message, course }
- Errors: 404 not found, 403 if unauthorized, 500 server error

Lectures — GET /api/lectures?courseId=<id> (public)
- Query: `courseId` (required)
- Returns all lectures for a published course, sorted by `order`
- Success: 200 { success, lectures }
- Errors: 400 missing courseId, 404 course not found or not published, 500 server error

Lectures — POST /api/lectures (auth)
- Query: `courseId` (required)
- Body: { title: string, videoUrl: string, order: number, isFreePreview?: boolean }
- Creates a new lecture linked to the course; `isFreePreview` defaults to false
- Success: 201 { success, message, lecture }
- Errors: 400 missing fields, 404 course not found, 500 server error

Lectures — DELETE /api/lectures?lectureId=<id> (auth)
- Query: `lectureId` (required)
- Deletes the lecture
- Success: 200 { success, message }
- Errors: 400 missing lectureId, 404 lecture not found, 500 server error

Notes:
- Use standard HTTP status codes: 400/401/403/404/409/500
- Keep `JWT_SECRET` in environment and rotate if needed
- Consider adding validation (Joi/express-validator) and pagination for the course list
- Protect lecture creation and deletion with authentication and RBAC (limit to course instructor or admin)
- Validate `order` uniqueness within a course, and consider re-ordering behavior
- Consider cascading deletes (remove lectures when deleting a course) and file/video cleanup


