import express from "express";
import { createClass, getClasses } from "../Controller/class/index.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Class APIs
 */

/**
 * @swagger
 * /api/classes:
 *   post:
 *     summary: Create class
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - subjects
 *             properties:
 *               name:
 *                 type: string
 *                 example: 12th
 *               subjects:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Maths", "Physics", "Chemistry"]
 *     responses:
 *       201:
 *         description: Class created successfully
 */

router.post("/", createClass);

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Get all classes
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: List of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 65f1a2b3c4d5e6f789abcd12
 *                       name:
 *                         type: string
 *                         example: 12th
 *                       subjects:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Maths", "Physics"]
 */
router.get("/", getClasses);

export default router;