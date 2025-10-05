const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only operations for user and content management
 */

/**
 * @swagger
 * /admin/users/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: PERMANENTLY deletes a user from both Firebase and the local database. Requires admin privileges.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The Firebase UID of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully.
 *       '400':
 *         description: Bad Request (e.g., admin trying to delete themself).
 *       '403':
 *         description: Forbidden - User is not an admin.
 *       '404':
 *         description: Not Found - User with the specified ID does not exist.
 *       '500':
 *         description: Internal server error.
 */
router.delete(
  '/users/:userId',
  authMiddleware,   
  adminMiddleware,  
  adminController.deleteUser 
);

module.exports = router;