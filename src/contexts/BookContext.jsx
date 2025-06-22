import { createContext, useState, useContext, useEffect } from "react";

const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [shelf, setShelf] = useState(() => {
    const saved = localStorage.getItem("shelf");
    return saved ? JSON.parse(saved) : [];
  });

  const [readingGoal, setReadingGoal] = useState(() => {
    const saved = localStorage.getItem("goal");
    return saved ? JSON.parse(saved) : 0;
  });

  //everytime the shelf is updated, turns shelf info to a json
  useEffect(() => {
    localStorage.setItem("shelf", JSON.stringify(shelf));
  }, [shelf]);

  useEffect(() => {
    localStorage.setItem("readingGoal", JSON.stringify(readingGoal));
  }, [readingGoal]);

  const finishedCount = shelf.filter((book) => book.finished).length;

  const addToShelf = (book) => {
    setShelf((prev) => {
      if (prev.some((b) => b.id === book.id)) return prev;
      //add finished, with default not finished
      return [...prev, { ...book, finished: false }];
    });
  };

  const removeFromShelf = (bookId) => {
    setShelf((prev) => prev.filter((book) => book.id !== bookId));
  };

  const onShelf = (bookId) => {
    return shelf.some((book) => book?.id === bookId);
  };

  const toggleFinished = (bookId) => {
    setShelf((prev) =>
      prev.map((book) =>
        book.id === bookId ? { ...book, finished: !book.finished } : book
      )
    );
  };

  const value = {
    shelf,
    addToShelf,
    removeFromShelf,
    onShelf,
    toggleFinished, 
    readingGoal,
    setReadingGoal,
    finishedCount
  };
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
