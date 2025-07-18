/**
 * User Routes
 * 
 * This module defines all user-related API endpoints.
 * Routes handle user registration, authentication, and profile management.
 * Some routes are public (registration/login) while others require authentication.
 */

const express = require("express");
const { registerUser, loginUser, currentUser, updateReadingGoal } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

/**
 * User Routes Configuration
 * 
 * POST /api/users/register - Register a new user (public)
 * POST /api/users/login - Login user and get JWT token (public)
 * GET /api/users/current - Get current user information (private)
 * PUT /api/users/reading-goal - Update user's reading goal (private)
 */

// Public route for user registration
router.post("/register", registerUser);

// Public route for user login
router.post("/login", loginUser);

// Protected route for getting current user info (requires JWT token)
router.get("/current", validateToken, currentUser);

// Protected route for updating reading goal (requires JWT token)
router.put("/reading-goal", validateToken, updateReadingGoal);

module.exports = router;