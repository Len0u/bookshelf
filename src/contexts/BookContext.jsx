import { createContext, useState, useContext, useEffect } from "react";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [shelf, setShelf] = useState([]);
  const [readingGoal, setReadingGoal] = useState(0);

  //get shelf with authentication
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/books", {
          headers: {
            //Authorization: `Bearer ${token}`, // if using auth
          },
        });
        const data = await res.json();
        setShelf(data);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    };

    fetchBooks();
  }, []);

  const finishedCount = shelf.filter(
    (book) => book.status === "finished"
  ).length;

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
      const res = await fetch("http://localhost:5001/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // add auth bearer
        body: JSON.stringify(normalizedBook),
      });

      const newBook = await res.json();

      setShelf((prev) => [newBook, ...prev]);
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  const removeFromShelf = async (googleBookId) => {
  try {
    // Find the book by googleBookId to get its _id
    const bookToDelete = shelf.find(book => book.googleBookId === googleBookId);
    if (!bookToDelete) return;

    await fetch(`http://localhost:5001/api/books/${bookToDelete._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Update local state after successful delete
    setShelf((prev) =>
      prev.filter((book) => book._id !== bookToDelete._id)
    );
  } catch (err) {
    console.error("Error deleting book:", err);
  }
};


  const onShelf = (bookId) => {
    return shelf.some((book) => book?.googleBookId === bookId);
  };

  const updateStatus = async (googleBookId, newStatus) => {
    try {
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
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

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
          },
          body: JSON.stringify({ rating: newRating }),
        }
      );

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
          },
          body: JSON.stringify({ review: newReview }),
        }
      );

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
          },
          body: JSON.stringify({ startDate: newStartDate }),
        }
      );

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
          },
          body: JSON.stringify({ endDate: newEndDate }),
        }
      );

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
    setReadingGoal,
    finishedCount,
    updateRating,
    updateReview,
    updateStartDate,
    updateEndDate,
  };
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};


export const useBookContext = () => useContext(BookContext);