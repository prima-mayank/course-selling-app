# models (mongodb schemas)

this directory contains all mongoose schemas used in the backend.

currently implemented models:
- user
- course
- lecture

---

## user model

collection: users

fields:
- name (string, required)
- email (string, required, unique)
- password (string, required)
- role (string: admin | student, default: student)
- createdAt, updatedAt (timestamps)

purpose:
- handles both admin and student users
- supports role based access control

---

## course model

collection: courses

fields:
- title (string, required)
- description (string, required)
- price (number, required)
- thumbnail (string, optional)
- instructor (objectId, ref: user, required)
- isPublished (boolean, default: false)
- createdAt, updatedAt (timestamps)

purpose:
- represents courses created by admin users
- separated from lectures for scalability

---

## lecture model

collection: lectures

fields:
- title (string, required)
- videoUrl (string, required)
- course (objectId, ref: course, required)
- order (number, required)
- isFreePreview (boolean, default: false)
- createdAt, updatedAt (timestamps)

purpose:
- represents individual lectures inside a course
- order controls lecture sequence

---

relationships:
user (admin) -> course -> lecture

status:
schemas finalized and stable
