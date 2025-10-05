const adminMiddleware = (req, res, next) => {
  // We can trust req.user.role because the authMiddleware just fetched it from our database.
  if (req.user && req.user.role === 'admin') {
    return next(); 
  }

  // If not an admin, deny access.
  res.status(403).json({ message: 'Forbidden: Admin access required.' });
};

module.exports = adminMiddleware;