const admin = require('../services/firebase');
const userModel = require('../models/userModel'); // We need the user model now

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split('Bearer ')[1];
  } else if (req.cookies.authToken) {
    token = req.cookies.authToken;
  }

  if (!token) {
    return res.status(401).json({ message: 'Authentication required. No token provided.' });
  }

  try {
    // 1. Verify the token with Firebase
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid } = decodedToken;

    const userFromDb = await userModel.findById(uid);

    // Path taken if user is not found in our database but holds valid firebase token
    if (!userFromDb) {
      return res.status(403).json({ message: 'User not found in our system.' });
    }
    req.user = userFromDb;
    
    next();
  } catch (error) {
    console.error('Error in authMiddleware:', error);
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;