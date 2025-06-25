import { createContext, useState, useContext, useEffect } from "react";

const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [shelf, setShelf] = useState(() => {
    const saved = localStorage.getItem("shelf");
    return saved ? JSON.parse(saved) : [];
  });

  const [readingGoal, setReadingGoal] = useState(() => {
    const saved = localStorage.getItem("readingGoal");
    return saved ? JSON.parse(saved) : 0;
  });

  //everytime the shelf is updated, turns shelf info to a json
  useEffect(() => {
    localStorage.setItem("shelf", JSON.stringify(shelf));
  }, [shelf]);

  useEffect(() => {
    localStorage.setItem("readingGoal", JSON.stringify(readingGoal));
  }, [readingGoal]);

  const finishedCount = shelf.filter(
    (book) => book.status === "finished"
  ).length;

  const addToShelf = (book) => {
    setShelf((prev) => {
      if (prev.some((b) => b.id === book.id)) return prev;
      //add finished, with default not finished
      return [...prev, { 
        ...book, 
        status: "tbr", 
        rating: 0, 
        review: "",
        startDate: "",
        endDate: ""
      }];
    });
  };

  const removeFromShelf = (bookId) => {
    setShelf((prev) => prev.filter((book) => book.id !== bookId));
  };

  const onShelf = (bookId) => {
    return shelf.some((book) => book?.id === bookId);
  };

  const updateStatus = (bookId, newStatus) => {
    setShelf((prev) =>
      prev.map((book) =>
        book.id === bookId ? { ...book, status: newStatus } : book
      )
    );
  };

  const updateRating = (bookId, newRating) => {
    setShelf((prev) =>
      prev.map((book) =>
        book.id === bookId ? { ...book, rating: Number(newRating) } : book
      )
    );
  };

  const updateReview = (bookId, newReview) => {
    setShelf((prev) =>
      prev.map((book) =>
        book.id === bookId ? { ...book, review: newReview } : book
      )
    );
  };

  const updateStartDate = (bookId, newStartDate) => {
    setShelf((prev) =>
      prev.map((book) =>
        book.id === bookId ? { ...book, startDate: newStartDate } : book
      )
    );
  };

  const updateEndDate = (bookId, newEndDate) => {
    setShelf((prev) =>
      prev.map((book) =>
        book.id === bookId ? { ...book, endDate: newEndDate } : book
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
    updateEndDate
  };
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
