/**
 * Book Model
 *
 * This module defines the Book schema for MongoDB using Mongoose.
 * Each book belongs to a specific user and contains basic book information
 * including title, author, genre, status, start and end date, rating, and review.
 * The model includes automatic timestamp tracking for created and updated dates.
 */

const mongoose = require("mongoose");

/**
 * Book Schema Definition
 *
 * Defines the structure and validation rules for book documents in the database.
 * Each book is associated with a user through the user_id field.
 */
const bookSchema = mongoose.Schema(
  {
    // Reference to the user who owns this book
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    // Book title (required)
    title: {
      type: String,
      required: [true, "Please enter book title"],
    },

    // Book author
    author: {
      type: String,
      default: "",
    },

    // Genre (optional)
    genre: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    googleBookId: {
      type: String,
      required: true,
      unique: true,
    },

    // Reading status
    status: {
      type: String,
      enum: ["tbr", "reading", "finished"],
      default: "tbr",
    },

    // Optional dates
    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    // Optional rating and review
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    review: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
