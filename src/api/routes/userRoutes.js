const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware'); 
const { updatePreferencesSchema, createUpdatePreferencesSchema } = require('../validators/userValidators'); 

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile and preference management
 */

/**
 * @swagger
 * /users/preferences:
 *   put:
 *     summary: Update user onboarding preferences
 *     description: Updates the user's preferences object based on their selections in the onboarding flow. Requires a valid Firebase ID token.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               favoriteGenres:
 *                 type: array
 *                 items:
 *                   type: string
 *               fictionBalance:
 *                 type: string
 *               readingPace:
 *                 type: string
 *               annualGoal:
 *                 type: integer
 *               motivations:
 *                 type: array
 *                 items:
 *                   type: string
 *               lovedBookRecent:
 *                 type: string
 *               wantsToConnectFriends:
 *                 type: boolean
 *             example:
 *               favoriteGenres: ["fantasy", "science_fiction", "history"] 
 *               fictionBalance: "mostly_non_fiction"
 *               readingPace: "standard"
 *               annualGoal: 24              
 *               motivations: ["discovering_authors", "hitting_goals"] 
 *               lovedBookRecent: "Project Hail Mary" 
 *               wantsToConnectFriends: true   
 *     responses:
 *       '200':
 *         description: Preferences updated successfully.
 *       '400':
 *         description: Bad Request - Invalid data provided.
 *       '401':
 *         description: Unauthorized - No token provided.
 *       '404':
 *         description: Not Found - User not found.
 */
router.put(
  '/preferences', 
  authMiddleware, 
  validate(createUpdatePreferencesSchema),
  userController.updatePreferences
);

module.exports = router;