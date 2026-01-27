# routes

this directory contains all api route definitions.

routes are responsible only for:
- defining api endpoints
- applying middleware
- forwarding requests to controllers

no business logic is written here.

---

## user routes
base path: /api/users

- POST /register
- POST /login

(public routes)

---

## course routes
base path: /api/courses

public:
- GET /
- GET /:id

admin only:
- POST /
- PATCH /:id/publish

---

## lecture routes
base path: /api/lectures

public:
- GET /:courseId

admin only:
- POST /:courseId
- DELETE /:lectureId
