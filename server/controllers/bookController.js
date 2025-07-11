/**
 * Book Controller
 *
 * This module handles all book-related operations including CRUD operations.
 * All functions are protected and require user authentication.
 * Each book is associated with a specific user through user_id.
 */

const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Book = require("../models/bookModel");

/**
 * Get all books for the authenticated user
 * @desc Retrieves all books that belong to the currently logged-in user
 * @route GET /api/books
 * @access Private - Requires valid JWT token
 * @param {Object} req - Express request object (contains user info from JWT)
 * @param {Object} res - Express response object
 * @returns {Array} Array of books objects belonging to the user
 */
const getBooks = asyncHandler(async (req, res) => {
  // Find all books where user_id matches the authenticated user's ID
  // For now, get all books since authentication is disabled
  const books = await Book.find({user_id: req.user.id });
  res.status(200).json(books);
});

/**
 * Create a new book for the authenticated user
 * @desc Creates a new book with title, author, genre, status, start and end date, rating, and review
 * @route POST /api/books
 * @access Private - Requires valid JWT token
 * @param {Object} req.body - Contains title, author, genre, and status
 * @param {Object} res - Express response object
 * @returns {Object} The newly created contact object
 */
const createBook = asyncHandler(async (req, res) => {
  console.log("the req body: ", req.body);
  const { title, author, genre, image, googleBookId, status, startDate, endDate, rating, review } =
    req.body;

  // Validate that all required fields are provided
  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }

  // Check if user already has this book
  const existingBook = await Book.findOne({ 
    user_id: req.user.id, 
    googleBookId: googleBookId 
  });

  if (existingBook) {
    res.status(400);
    throw new Error("Book already exists in your shelf");
  }

  // Create new book and associate it with the authenticated user
  const book = await Book.create({
    user_id: req.user.id,
    title,
    author,
    genre,
    image,
    googleBookId,
    status,
    startDate,
    endDate,
    rating,
    review,
  });
  res.status(201).json(book);
});

/**
 * Update a specific book by title
 * @desc Updates an existing book's information
 * @route PUT /api/books/:id
 * @access Private - Requires valid JWT token
 * @param {string} req.params.id - Book ID from URL parameter
 * @param {Object} req.body - Updated book data
 * @param {Object} res - Express response object
 * @returns {Object} The updated book object
 */
const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  // Check if book exists
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  // Ensure user can only update their own books
  if (book.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User doesn't have permission to update other user books"
    );
  }

  // Update the book with new data
  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true } // Return the updated document
  );
  res.status(200).json(updatedBook);
});

/**
 * Delete a specific book by ID
 * @desc Removes a book from the database
 * @route DELETE /api/books/:id
 * @access Private - Requires valid JWT token
 * @param {string} req.params.id - Book ID from URL parameter
 * @param {Object} res - Express response object
 * @returns {Object} The deleted contact object
 */
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  // Check if book exists
  if (!book) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Ensure user can only delete their own books
  if (book.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User doesn't have permission to delete other user books"
    );
  }

  // Delete the book
  await Book.deleteOne({ _id: req.params.id });
  res.status(200).json(book);
});

module.exports = {
  getBooks,
  createBook,
  updateBook,
  deleteBook
};
