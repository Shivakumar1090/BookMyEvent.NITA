const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Define your admin middleware function
const adminMiddleware = async(req, res, next) => {
  // Get the token from the request header
  const token = req.header('Authorization');

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ Message: 'Unauthorized' });
  }

  try {
    // Verify and decode the token
    const decoded = await jwt.verify(token, JWT_SECRET);

    // Check if the user is an admin
    if (decoded.isAdmin) {
      // User is an admin, allow access to the route
      req.user = decoded;
      next();
    } else {
      // User is not an admin, return a forbidden error
      res.status(403).json({ Message: 'Forbidden' });
    }
  } catch (error) {
    // Invalid token
    res.status(401).json({ Message: 'Invalid token' });
  }
};

module.exports = adminMiddleware;