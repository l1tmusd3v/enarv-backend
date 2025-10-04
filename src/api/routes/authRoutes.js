const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User registration and authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a user record in the database after they have successfully signed up with Firebase. Requires a valid Firebase ID token.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - fullName
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's unique username.
 *               fullName:
 *                 type: string
 *                 description: The user's full name.
 *               bio:
 *                 type: string
 *                 description: A short biography for the user (optional).
 *             example:
 *               username: "john_doe"
 *               fullName: "John Doe"
 *               bio: "Lover of classic literature."
 *     responses:
 *       '201':
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User' # You can define reusable schemas
 *       '400':
 *         description: Bad Request - Missing required fields.
 *       '401':
 *         description: Unauthorized - No token provided.
 *       '403':
 *         description: Forbidden - Invalid or expired token.
 *       '409':
 *         description: Conflict - Username or email already exists.
 */
router.post('/register', authMiddleware, authController.registerUser);

module.exports = router;