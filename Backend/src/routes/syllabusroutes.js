import express from "express";
import {
  createSyllabus,
  getSyllabus,
} from "../Controller/Syllabus/index.js";
import { protect } from "../Middleware/authmiddleware.js"; // ✅ FIXED
import upload from "../Middleware/upload.js"; // ✅ use this for file upload

import { createSyllabusValidation } from "../Validation/syllabusvalidation.js";

const router = express.Router();

// Multer config

/**
 * @swagger
 * tags:
 *   name: Syllabus
 *   description: Syllabus APIs
 */

/**
 * @swagger
 * /api/syllabus:
 *   post:
 *     summary: Upload syllabus PDF
 *     tags: [Syllabus]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - class
 *               - subject
 *               - file
 *             properties:
 *               class:
 *                 type: string
 *               subject:
 *                 type: string
 *               title:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Syllabus uploaded successfully
 */
router.post(
  "/",
  protect,
  upload.single("file"),
  createSyllabusValidation,
  createSyllabus
);

/**
 * @swagger
 * /api/syllabus:
 *   get:
 *     summary: Get syllabus list
 *     tags: [Syllabus]
 *     parameters:
 *       - in: query
 *         name: classId
 *         schema:
 *           type: string
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of syllabus
 */
router.get("/", getSyllabus);

export default router;