/**
 * Book Routes
 * 
 * This module defines all book-related API endpoints.
 * All routes are protected and require valid JWT authentication.
 * Routes handle CRUD operations for user contacts.
 */

const express = require("express");
const router = express.Router();

// Import contact controller functions
const {
  getBooks,
  createBook,
  updateBook,
  deleteBook
} = require("../controllers/bookController.js");

// Import JWT validation middleware
const validateToken = require("../middleware/validateTokenHandler.js");

// Apply JWT authentication to all contact routes
router.use(validateToken);

// Add debugging middleware
router.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

/**
 * Book Routes Configuration
 * 
 * GET /api/books - Get all books for authenticated user
 * POST /api/books - Create a new book for authenticated user
 * PUT /api/books/:id - Update a specific book by ID
 * DELETE /api/books/:id - Delete a specific book by ID
 */

// Route for getting all books and creating new books
router.route("/").get(getBooks).post(createBook);

// Route for individual contact operations (get, update, delete)
router.route("/:id").put(updateBook).delete(deleteBook);

module.exports = router;