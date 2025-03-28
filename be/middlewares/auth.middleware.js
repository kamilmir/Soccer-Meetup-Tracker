const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;  // Ensure you have SECRET_KEY in your .env file

// JWT middleware to verify token and extract user information
const jwtMiddleware = (req, res, next) => {
  // Check if Authorization header exists and contains the token
  const token = req.headers['authorization']?.split(' ')[1];  // Expecting "Bearer <token>"
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
    
    // Attach user ID to the request object
    req.userId = decoded.id;  // Assuming the JWT payload contains 'id'
    
    next();  // Pass the control to the next middleware or route handler
  });
};

module.exports = jwtMiddleware;
