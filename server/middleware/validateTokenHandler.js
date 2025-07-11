/**
 * JWT Token Validation Middleware
 * 
 * This middleware validates JWT tokens from the Authorization header.
 * It extracts the token, verifies it using the secret key, and attaches
 * the decoded user information to the request object for use in protected routes.
 */

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

/**
 * Validate JWT token and authenticate user
 * @desc Extracts and validates JWT token from Authorization header
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 * @returns {void} Calls next() if token is valid, throws error if invalid
 */
const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  
  // Extract Authorization header (case-insensitive)
  let authHeader = req.headers.Authorization || req.headers.authorization;
  
  // Check if Authorization header exists and starts with "Bearer"
  if (authHeader && authHeader.startsWith("Bearer")) {
    // Extract token from "Bearer <token>" format
    token = authHeader.split(" ")[1];
    
    // Check if token exists after extraction
    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
    
    // Verify the token using the secret key
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      
      // Attach decoded user information to request object
      req.user = decoded.user;
      next();
    });
  } else {
    res.status(401);
    throw new Error("Authorization header missing or invalid format");
  }
})

module.exports = validateToken;