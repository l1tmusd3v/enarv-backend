const admin = require('../services/firebase');

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split('Bearer ')[1];
  } 
  else if (req.cookies.authToken) {
    token = req.cookies.authToken;
  }


  if (!token) {
    return res.status(401).json({ message: 'Authentication required. No token provided.' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    if (req.cookies.authToken) {
      res.clearCookie('authToken');
    }
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;