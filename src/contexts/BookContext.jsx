import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [shelf, setShelf] = useState([]);
  const [readingGoal, setReadingGoal] = useState(0);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch user's reading goal
  const fetchReadingGoal = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const res = await fetch("http://localhost:5001/api/users/current", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          console.error("Unauthorized - token may be invalid");
          logout();
          navigate("/login");
          return;
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const userData = await res.json();
      setReadingGoal(userData.readingGoal || 0);
    } catch (err) {
      console.error("Failed to fetch reading goal:", err);
    }
  };

  // Update reading goal in database
  const updateReadingGoalInDB = async (newGoal) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const res = await fetch("http://localhost:5001/api/users/reading-goal", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ readingGoal: newGoal }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          console.error("Unauthorized - token may be invalid");
          logout();
          navigate("/login");
          return;
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (err) {
      console.error("Failed to update reading goal:", err);
    }
  };

  //get shelf with authentication
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const res = await fetch("http://localhost:5001/api/books", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        
        if (!res.ok) {
          if (res.status === 401) {
            console.error("Unauthorized - token may be invalid");
            logout();
            navigate("/login");
            return;
          }
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        setShelf(data);
      } catch (err) {
        console.error("Failed to fetch books:", err);
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

  const finishedCount = shelf.filter(
    (book) => book.status === "finished"
  ).length;

  // Wrapper for setReadingGoal that also updates the database
  const updateReadingGoal = (newGoal) => {
    setReadingGoal(newGoal);
    updateReadingGoalInDB(newGoal);
  };

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

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const res = await fetch("http://localhost:5001/api/books", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(normalizedBook),
      });

      if (!res.ok) {
        if (res.status === 401) {
          console.error("Unauthorized - token may be invalid");
          logout();
          navigate("/login");
          return;
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const newBook = await res.json();
      setShelf((prev) => [newBook, ...prev]);
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  const removeFromShelf = async (googleBookId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    // Find the book by googleBookId to get its _id
    const bookToDelete = shelf.find(book => book.googleBookId === googleBookId);
    if (!bookToDelete) return;

    const res = await fetch(`http://localhost:5001/api/books/${bookToDelete._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });

    if (!res.ok) {
      if (res.status === 401) {
        console.error("Unauthorized - token may be invalid");
        logout();
        navigate("/login");
        return;
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // Update local state after successful delete
    setShelf((prev) =>
      prev.filter((book) => book._id !== bookToDelete._id)
    );
  } catch (err) {
    console.error("Error deleting book:", err);
  }
};


  const onShelf = (bookId) => {
    console.log("onShelf check:", { bookId, shelfLength: shelf.length }); // Debug: Check what's being searched
    return shelf.some((book) => book?.googleBookId === bookId);
  };

  const updateStatus = async (googleBookId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const bookToUpdate = shelf.find(
        (book) => book.googleBookId === googleBookId
      );
      if (!bookToUpdate) return;
      
      const res = await fetch(
        `http://localhost:5001/api/books/${bookToUpdate._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          console.error("Unauthorized - token may be invalid");
          logout();
          navigate("/login");
          return;
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const updatedBook = await res.json();

      setShelf((prev) =>
        prev.map((book) => (book.googleBookId === googleBookId ? updatedBook : book))
      );
      
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const updateRating = async (googleBookId, newRating) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const bookToUpdate = shelf.find(
        (book) => book.googleBookId === googleBookId
      );
      if (!bookToUpdate) return;
      
      const res = await fetch(
        `http://localhost:5001/api/books/${bookToUpdate._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ rating: newRating }),
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          console.error("Unauthorized - token may be invalid");
          logout();
          navigate("/login");
          return;
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const updatedBook = await res.json();

      setShelf((prev) =>
        prev.map((book) => (book.googleBookId === googleBookId ? updatedBook : book))
      );
      
    } catch (err) {
      console.error("Error updating rating:", err);
    }
  };

  const updateReview = async (googleBookId, newReview) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const bookToUpdate = shelf.find(
        (book) => book.googleBookId === googleBookId
      );
      if (!bookToUpdate) return;
      
      const res = await fetch(
        `http://localhost:5001/api/books/${bookToUpdate._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ review: newReview }),
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          console.error("Unauthorized - token may be invalid");
          logout();
          navigate("/login");
          return;
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const updatedBook = await res.json();

      setShelf((prev) =>
        prev.map((book) => (book.googleBookId === googleBookId ? updatedBook : book))
      );
      
    } catch (err) {
      console.error("Error updating review:", err);
    }
  };

  const updateStartDate = async (googleBookId, newStartDate) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const bookToUpdate = shelf.find(
        (book) => book.googleBookId === googleBookId
      );
      if (!bookToUpdate) return;
      
      const res = await fetch(
        `http://localhost:5001/api/books/${bookToUpdate._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ startDate: newStartDate }),
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          console.error("Unauthorized - token may be invalid");
          logout();
          navigate("/login");
          return;
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const updatedBook = await res.json();

      setShelf((prev) =>
        prev.map((book) => (book.googleBookId === googleBookId ? updatedBook : book))
      );
      
    } catch (err) {
      console.error("Error updating start date:", err);
    }
  };

  const updateEndDate = async (googleBookId, newEndDate) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const bookToUpdate = shelf.find(
        (book) => book.googleBookId === googleBookId
      );
      if (!bookToUpdate) return;
      
      const res = await fetch(
        `http://localhost:5001/api/books/${bookToUpdate._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ endDate: newEndDate }),
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          console.error("Unauthorized - token may be invalid");
          logout();
          navigate("/login");
          return;
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const updatedBook = await res.json();

      setShelf((prev) =>
        prev.map((book) => (book.googleBookId === googleBookId ? updatedBook : book))
      );
      
    } catch (err) {
      console.error("Error updating end date:", err);
    }
  };

  const value = {
    shelf,
    addToShelf,
    removeFromShelf,
    onShelf,
    updateStatus,
    readingGoal,
    setReadingGoal: updateReadingGoal,
    finishedCount,
    updateRating,
    updateReview,
    updateStartDate,
    updateEndDate,
  };
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};


export const useBookContext = () => useContext(BookContext);