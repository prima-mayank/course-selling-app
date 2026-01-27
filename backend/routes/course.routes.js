import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/rbac.middleware.js";
import {createCourse,getAllCourses,getCourseById, publishCourse} from "../controllers/courses.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of courses
 */
router.get("/", getAllCourses);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get single course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course details
 *       404:
 *         description: Course not found
 */
router.get("/:id", getCourseById);

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course (Admin only)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 example: Node.js Mastery
 *               description:
 *                 type: string
 *                 example: Complete backend course
 *               price:
 *                 type: number
 *                 example: 999
 *               thumbnail:
 *                 type: string
 *                 example: https://image.url
 *     responses:
 *       201:
 *         description: Course created successfully (draft)
 *       400:
 *         description: Title, description and price are required
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.post("/",authMiddleware,authorizeRoles("admin"),createCourse);



/**
 * @swagger
 * /api/courses/publish/{id}:
 *   patch:
 *     summary: Publish a course (Admin only)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID to publish
 *     responses:
 *       200:
 *         description: Course published successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Course not found
 */
router.patch("/publish/:id",authMiddleware,authorizeRoles("admin"),publishCourse);


export default router;
