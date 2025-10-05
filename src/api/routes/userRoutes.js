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
/**
 * @swagger
 * /users/preferences/options:
 *   get:
 *     summary: Get Onboarding Preference Options
 *     description: Retrieves a structured object of all available, admin-configurable choices for the user onboarding flow (e.g., reading paces, motivations). This allows the frontend to dynamically build the selection UI.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A JSON object with keys for each question and arrays of options as values.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 readingPace:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       value:
 *                         type: string
 *                         example: "standard"
 *                       label:
 *                         type: string
 *                         example: "Standard (1-2 weeks)"
 *                 motivations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       value:
 *                         type: string
 *                         example: "discovering_authors"
 *                       label:
 *                         type: string
 *                         example: "Discovering new authors"
 *               # ... other keys like 'fictionBalance' would also be present
 *       '401':
 *         description: Unauthorized - No token provided.
 *       '500':
 *         description: Internal Server Error.
 */
router.get(
  '/preferences/options',
  userController.getOnboardingOptions
);
module.exports = router;