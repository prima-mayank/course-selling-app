import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/rbac.middleware.js";
import {getLecturesByCourse,addLecture,deleteLecture} from "../controllers/lecture.controller.js"; // controllers to be implemented next

const router = express.Router();

/**
 * @swagger
 * /api/lectures:
 *   get:
 *     summary: Get all lectures of a course
 *     tags: [Lectures]
 *     parameters:
 *       - in: query
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID whose lectures are required
 *     responses:
 *       200:
 *         description: List of lectures
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 lectures:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Course not found or not published
 */
router.get("/", getLecturesByCourse);

/**
 * @swagger
 * /api/lectures:
 *   post:
 *     summary: Add a lecture to a course (Admin only)
 *     tags: [Lectures]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID to which lecture will be added
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Introduction to React"
 *               description:
 *                 type: string
 *                 example: "First lecture covering basics"
 *               videoUrl:
 *                 type: string
 *                 example: "https://cdn.example.com/video.mp4"
 *     responses:
 *       201:
 *         description: Lecture added successfully
 *       400:
 *         description: Missing courseId or lecture data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.post("/",authMiddleware,authorizeRoles("admin"),addLecture);

/**
 * @swagger
 * /api/lectures:
 *   delete:
 *     summary: Delete a lecture (Admin only)
 *     tags: [Lectures]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: lectureId
 *         required: true
 *         schema:
 *           type: string
 *         description: Lecture ID to delete
 *     responses:
 *       200:
 *         description: Lecture deleted successfully
 *       400:
 *         description: Missing lectureId
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Lecture not found
 */
router.delete("/",authMiddleware,authorizeRoles("admin"),deleteLecture);


export default router;
