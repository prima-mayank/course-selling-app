# User Controllers Documentation

This document describes the **User Controllers** used in the Course Selling Application backend.

User controllers are responsible for:
- User registration
- User authentication (login)
- JWT token generation

They contain **business logic only** and are invoked by routes.

---

## Controller File Location

controllers/user.controller.js

---

## 1. registerUser

### Description
Registers a new user in the system.

- Default role assigned: `student`
- Password is hashed before storage
- Duplicate email registrations are prevented

---

### Route
POST /api/users/register

---

### Request Body
```json
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "123456"
}
