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

Notes:
- Use standard HTTP status codes: 400/401/403/404/409/500
- Keep `JWT_SECRET` in environment and rotate if needed
- Consider adding validation (Joi/express-validator) and pagination for the course list


