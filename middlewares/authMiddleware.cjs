// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  

  if (!token)
    return res.status(401).json({ message: 'Access denied. No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err)
      return res.status(401).json({ message: 'Invalid token.' });

    req.user = decoded;
    next();
  });
};