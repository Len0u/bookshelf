import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import { useBookContext } from "../contexts/BookContext";
import "../css/Shelf.css"

function Shelf() {
  const [books, setBooks] = useState([]);
  const [viewingShelf, setViewingShelf] = useState("all");
  const [sortBy, setSortBy] = useState("dateAdded");

  const { shelf } = useBookContext();

  useEffect(() => {
    if (viewingShelf) {
      let filtered =
        viewingShelf === "finished"
          ? shelf.filter((b) => b.status === "finished")
          : viewingShelf === "tbr"
          ? shelf.filter((b) => b.status === "tbr")
          : viewingShelf === "reading"
          ? shelf.filter((b) => b.status === "reading")
          : shelf;
      
      // Sort the filtered books
      filtered = sortBooks(filtered, sortBy);
      setBooks(filtered);
    }
  }, [shelf, viewingShelf, sortBy]);

  const sortBooks = (bookList, sortOption) => {
    const sortedBooks = [...bookList];
    
    switch (sortOption) {
      case "dateAdded":
        // Books are already in date added order from the context
        return sortedBooks;
      case "author":
        return sortedBooks.sort((a, b) => {
          const authorA = a.author || "";
          const authorB = b.author || "";
          return authorA.localeCompare(authorB);
        });
      case "rating":
        return sortedBooks.sort((a, b) => {
          const ratingA = a.rating || 0;
          const ratingB = b.rating || 0;
          return ratingB - ratingA; // Highest rating first
        });
      case "status":
        const statusOrder = { "reading": 1, "tbr": 2, "finished": 3 };
        return sortedBooks.sort((a, b) => {
          const statusA = statusOrder[a.status] || 0;
          const statusB = statusOrder[b.status] || 0;
          return statusA - statusB;
        });
      default:
        return sortedBooks;
    }
  };

  const total = shelf.length;
  const tbrCount = shelf.filter((b) => b.status === "tbr").length;
  const readingCount = shelf.filter((b) => b.status === "reading").length;
  const finishedCount = shelf.filter((b) => b.status === "finished").length;

  return (
    <div className="my-shelf">
      <div className="shelf-controls">
        <div className="filter-buttons">
          <button
            type="button"
            className="view-shelf-button"
            onClick={() => setViewingShelf("all")}
          >
            My Shelf
          </button>

          <button
            type="button"
            className="view-tbr-shelf-button"
            onClick={() => setViewingShelf("tbr")}
          >
            TBR
          </button>

          <button
            type="button"
            className="view-reading-shelf-button"
            onClick={() => setViewingShelf("reading")}
          >
            Reading Books
          </button>
          <button
            type="button"
            className="view-finished-shelf-button"
            onClick={() => setViewingShelf("finished")}
          >
            Finished Books
          </button>
        </div>

        <div className="sort-controls">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-dropdown"
          >
            <option value="dateAdded">Date Added</option>
            <option value="author">Author</option>
            <option value="rating">Rating</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      <h2>
        {viewingShelf === "all"
          ? "All Books"
          : viewingShelf === "finished"
          ? "Finished Books"
          : viewingShelf === "reading"
          ? "Currently Reading"
          : "To Be Read"}
      </h2>
      <div className="book-grid">
        {books.map((book) => (
          <BookCard book={book} key={book.googleBookId} />
        ))}
      </div>

      {books.length === 0 && <p>No books to show</p>}
      <div className="shelf-counts">
        <p>Total: {total}</p>
        <p>Reading: {readingCount}</p>
        <p>TBR: {tbrCount}</p>
        <p>Finished: {finishedCount}</p>
      </div>
    </div>
  );
}

export default Shelf;
