const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/auth/register', authMiddleware, authController.registerUser);


module.exports = router;