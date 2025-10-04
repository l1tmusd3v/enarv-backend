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
 * /auth/register:
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
 *               full_name:
 *                 type: string
 *                 description: The user's full name.
 *               bio:
 *                 type: string
 *                 description: A short biography for the user (optional).
 *               dob:
 *                 type: string
 *                 format: date
 *                 description: "User's date of birth in YYYY-MM-DD format."
 *             example:
 *               username: "john_doe"
 *               full_name: "John Doe"
 *               bio: "Lover of classic literature."
 *               dob: "1990-05-15"
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


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Receives a Firebase ID token, verifies it, and sets it in a secure httpOnly cookie to establish an authenticated session.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [idToken]
 *             properties:
 *               idToken:
 *                 type: string
 *                 description: The JWT ID token obtained from Firebase after client-side authentication.
 *     responses:
 *       '200':
 *         description: Login successful. Cookie is set.
 *       '400':
 *         description: Bad Request - Missing ID token.
 *       '401':
 *         description: Unauthorized - Invalid or expired token.
 *       '404':
 *         description: User not found in local database.
 */
router.post('/login', authController.login);

module.exports = router;