import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const BookContext = createContext();
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

export const BookProvider = ({ children }) => {
  const [shelf, setShelf] = useState([]);
  const [readingGoal, setReadingGoal] = useState(0);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  /**
   * Utility function for making authenticated API requests
   * Handles token retrieval, headers setup, error handling, and 401 responses
   * @param {string} url - The API endpoint URL
   * @param {Object} options - Fetch options (method, body, etc.)
   * @returns {Response|null} - Response object or null if request failed
   */
  const makeAuthenticatedRequest = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      return null;
    }

    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...options,
    };

    try {
      const res = await fetch(url, defaultOptions);

      if (!res.ok) {
        if (res.status === 401) {
          console.error("Unauthorized - token may be invalid");
          logout();
          navigate("/login");
          return null;
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return res;
    } catch (err) {
      console.error("API request failed:", err);
      return null;
    }
  };

  /**
   * Utility function to find a book by its Google Book ID
   * @param {string} googleBookId - The Google Book ID to search for
   * @returns {Object|null} - The book object or null if not found
   */
  const findBookById = (googleBookId) => {
    return shelf.find((book) => book.googleBookId === googleBookId);
  };

  /**
   * Utility function to update a book in the shelf state
   * @param {string} googleBookId - The Google Book ID of the book to update
   * @param {Object} updatedBook - The updated book object from the server
   */
  const updateBookInShelf = (googleBookId, updatedBook) => {
    setShelf((prev) =>
      prev.map((book) =>
        book.googleBookId === googleBookId ? updatedBook : book
      )
    );
  };

  /**
   * Fetches the user's reading goal from the server
   */
  const fetchReadingGoal = async () => {
    const res = await makeAuthenticatedRequest(`${baseURL}/api/users/current`);
    if (res) {
      const userData = await res.json();
      setReadingGoal(userData.readingGoal || 0);
    }
  };

  /**
   * Updates the reading goal in the database
   * @param {number} newGoal - The new reading goal value
   */
  const updateReadingGoalInDB = async (newGoal) => {
    await makeAuthenticatedRequest(`${baseURL}/api/users/reading-goal`, {
      method: "PUT",
      body: JSON.stringify({ readingGoal: newGoal }),
    });
  };

  // Fetch books and reading goal when user is authenticated
  useEffect(() => {
    const fetchBooks = async () => {
      const res = await makeAuthenticatedRequest(`${baseURL}/api/books`);
      if (res) {
        const data = await res.json();
        setShelf(data);
      }
    };

    if (isAuthenticated) {
      fetchBooks();
      fetchReadingGoal();
    }
  }, [isAuthenticated, logout, navigate]);

  // Clear shelf when user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setShelf([]);
      setReadingGoal(0);
    }
  }, [isAuthenticated]);

  /**
   * Wrapper for setReadingGoal that also updates the database
   * @param {number} newGoal - The new reading goal value
   */
  const updateReadingGoal = (newGoal) => {
    setReadingGoal(newGoal);
    updateReadingGoalInDB(newGoal);
  };

  /**
   * Adds a book to the user's shelf
   * @param {Object} googleBook - The Google Books API book object
   */
  const addToShelf = async (googleBook) => {
    const info = googleBook.volumeInfo;
    const normalizedBook = {
      title: info.title || "Untitled",
      author: info.authors?.[0] || "Unknown",
      genre: info.categories?.[0] || "",
      image: info.imageLinks?.thumbnail || "",
      googleBookId: googleBook.id,
      status: "tbr",
      rating: 0,
      review: "",
      startDate: null,
      endDate: null,
    };

    const res = await makeAuthenticatedRequest(`${baseURL}/api/books`, {
      method: "POST",
      body: JSON.stringify(normalizedBook),
    });

    if (res) {
      const newBook = await res.json();
      setShelf((prev) => [newBook, ...prev]);
    }
  };

  /**
   * Removes a book from the user's shelf
   * @param {string} googleBookId - The Google Book ID of the book to remove
   */
  const removeFromShelf = async (googleBookId) => {
    const bookToDelete = findBookById(googleBookId);
    if (!bookToDelete) return;

    const res = await makeAuthenticatedRequest(
      `${baseURL}/api/books/${bookToDelete._id}`,
      {
        method: "DELETE",
      }
    );

    if (res) {
      setShelf((prev) => prev.filter((book) => book._id !== bookToDelete._id));
    }
  };

  /**
   * Checks if a book is already on the user's shelf
   * @param {string} bookId - The Google Book ID to check
   * @returns {boolean} - True if the book is on the shelf, false otherwise
   */
  const onShelf = (bookId) => {
    return shelf.some((book) => book?.googleBookId === bookId);
  };

  /**
   * Generic function to update any book field
   * @param {string} googleBookId - The Google Book ID of the book to update
   * @param {string} fieldName - The name of the field to update
   * @param {any} newValue - The new value for the field
   * @param {string} errorMessage - Error message for logging (optional)
   */
  const updateBookField = async (
    googleBookId,
    fieldName,
    newValue,
    errorMessage
  ) => {
    const bookToUpdate = findBookById(googleBookId);
    if (!bookToUpdate) return;

    const res = await makeAuthenticatedRequest(
      `${baseURL}/api/books/${bookToUpdate._id}`,
      {
        method: "PUT",
        body: JSON.stringify({ [fieldName]: newValue }),
      }
    );

    if (res) {
      const updatedBook = await res.json();
      updateBookInShelf(googleBookId, updatedBook);
    }
  };

  // Specific update functions that use the generic updateBookField
  const updateStatus = async (googleBookId, newStatus) => {
    await updateBookField(
      googleBookId,
      "status",
      newStatus,
      "Error updating status"
    );
  };

  const updateRating = async (googleBookId, newRating) => {
    await updateBookField(
      googleBookId,
      "rating",
      newRating,
      "Error updating rating"
    );
  };

  const updateReview = async (googleBookId, newReview) => {
    await updateBookField(
      googleBookId,
      "review",
      newReview,
      "Error updating review"
    );
  };

  const updateStartDate = async (googleBookId, newStartDate) => {
    await updateBookField(
      googleBookId,
      "startDate",
      newStartDate,
      "Error updating start date"
    );
  };

  const updateEndDate = async (googleBookId, newEndDate) => {
    await updateBookField(
      googleBookId,
      "endDate",
      newEndDate,
      "Error updating end date"
    );
  };

  const value = {
    shelf,
    addToShelf,
    removeFromShelf,
    onShelf,
    updateStatus,
    readingGoal,
    setReadingGoal: updateReadingGoal,
    updateRating,
    updateReview,
    updateStartDate,
    updateEndDate,
  };
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBookContext = () => useContext(BookContext);
