/**
 * User Model
 * 
 * This module defines the User schema for MongoDB using Mongoose.
 * The User model stores user authentication information including username,
 * email, and hashed password. Email addresses must be unique across all users.
 * The model includes automatic timestamp tracking for created and updated dates.
 */

const mongoose = require("mongoose");

/**
 * User Schema Definition
 * 
 * Defines the structure and validation rules for user documents in the database.
 * Includes unique email constraint and required field validation.
 */
const userSchema = mongoose.Schema( {
  // User's display name
  username: {
    type: String,
    required: [true, "Please add the user name"],
  },
  
  // User's email address (must be unique)
  email: {
    type: String,
    required: [true, "Please add the user email"],
    unique: [true, "Email address already taken"], // Ensures email uniqueness
  }, 
  
  // User's hashed password (never stored as plain text)
  password: {
    type: String,
    required: [true, "Please add the user password"],
  },

  readingGoal: {
    type: Number,
    default: 0,
  }

}, {
  // Automatically add createdAt and updatedAt timestamps
  timestamps: true
})

// Export the User model
module.exports = mongoose.model("User", userSchema);