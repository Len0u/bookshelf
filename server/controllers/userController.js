/**
 * User Controller
 * 
 * This module handles user authentication and management operations including
 * user registration, login, and current user information retrieval.
 * Uses bcrypt for password hashing and JWT for token-based authentication.
 */

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Register a new user
 * @desc Creates a new user account with hashed password
 * @route POST /api/users/register
 * @access Public - No authentication required
 * @param {Object} req.body - Contains username, email, password
 * @param {Object} res - Express response object
 * @returns {Object} User data (without password) if successful
 */
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  
  // Validate that all required fields are provided
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  
  // Check if user with this email already exists
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }
  
  // Hash the password using bcrypt with salt rounds of 10
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed", hashedPassword);
  
  // Create new user with hashed password
  const user = await User.create({ username, email, password: hashedPassword });
  console.log(`User created ${user}`);
  
  if (user) {
    // Return user data without password
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});

/**
 * Login user and generate JWT token
 * @desc Authenticates user credentials and returns access token
 * @route POST /api/users/login
 * @access Public - No authentication required
 * @param {Object} req.body - Contains email, password
 * @param {Object} res - Express response object
 * @returns {Object} JWT access token if authentication successful
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  // Validate that all required fields are provided
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  
  // Find user by email
  const user = await User.findOne({ email });
  
  // Compare provided password with hashed password in database
  if (user && (await bcrypt.compare(password, user.password))) {
    // Generate JWT token with user information
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" } // Token expires in 15 minutes
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid")
  }
  res.json({ message: "login" });
});

/**
 * Get current user information
 * @desc Returns information about the currently authenticated user
 * @route GET /api/users/current
 * @access Private - Requires valid JWT token
 * @param {Object} req - Express request object (contains user info from JWT)
 * @param {Object} res - Express response object
 * @returns {Object} Current user information
 */
const currentUser = asyncHandler(async (req, res) => {
  // User information is available in req.user from JWT token
  res.status(200).json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email
  });
});

module.exports = { registerUser, loginUser, currentUser };
