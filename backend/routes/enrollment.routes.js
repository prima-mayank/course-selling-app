import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/rbac.middleware.js";
import { enrollCourse } from "../controllers/enrollment.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/enrollments/{courseId}:
 *   post:
 *     summary: Enroll student into a course
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Enrolled successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Course not found
 */
router.post("/:courseId",authMiddleware,authorizeRoles("student"),enrollCourse);

export default router;
