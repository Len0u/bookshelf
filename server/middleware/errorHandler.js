/**
 * Global Error Handler Middleware
 * 
 * This middleware handles all errors thrown throughout the application.
 * It categorizes errors based on HTTP status codes and returns
 * appropriate error responses with consistent formatting.
 */

const { constants } = require("../constants");

/**
 * Handle application errors and return appropriate responses
 * @desc Processes errors and returns formatted error responses based on status code
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 * @returns {Object} JSON error response with title, message, and stack trace
 */
const errorHandler = (err, req, res, next) => {
  // Get status code from response or default to 500 (Internal Server Error)
  const statusCode = res.statusCode ? res.statusCode : 500;
  
  // Handle different types of errors based on status code
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
      
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
      
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
      
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
      
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
      console.log("No error, all good!");
      break;
  }
};

module.exports = errorHandler;
