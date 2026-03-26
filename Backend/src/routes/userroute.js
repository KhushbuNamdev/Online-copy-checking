import express from "express";
import { registerUser, authUser, getme } from "../Controller/userController.js";
import { protect } from "../Middleware/authmiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User APIs
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Khushbu
 *               email:
 *                 type: string
 *                 example: khushbu@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: khushbu@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post("/login", authUser);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", protect, getme);

export default router;