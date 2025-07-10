import { createContext, useState, useContext, useEffect } from "react";

const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);

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

  const removeFromShelf = (bookId) => {
    setShelf((prev) => prev.filter((book) => book.googleBookId !== bookId));
  };

  const onShelf = (bookId) => {
    return shelf.some((book) => book?.googleBookId === bookId);
  };

  const updateStatus = (bookId, newStatus) => {
    setShelf((prev) =>
      prev.map((book) =>
        book.googleBookId === bookId ? { ...book, status: newStatus } : book
      )
    );
  };

  const updateRating = (bookId, newRating) => {
    setShelf((prev) =>
      prev.map((book) =>
        book.googleBookId === bookId ? { ...book, rating: Number(newRating) } : book
      )
    );
  };

  const updateReview = (bookId, newReview) => {
    setShelf((prev) =>
      prev.map((book) =>
        book.googleBookId === bookId ? { ...book, review: newReview } : book
      )
    );
  };

  const updateStartDate = (bookId, newStartDate) => {
    setShelf((prev) =>
      prev.map((book) =>
        book.googleBookId === bookId ? { ...book, startDate: newStartDate } : book
      )
    );
  };

  const updateEndDate = (bookId, newEndDate) => {
    setShelf((prev) =>
      prev.map((book) =>
        book.googleBookId === bookId ? { ...book, endDate: newEndDate } : book
      )
    );
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
