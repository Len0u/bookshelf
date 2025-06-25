import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import { useBookContext } from "../contexts/BookContext";
import "../css/Shelf.css"

function Shelf() {
  const [books, setBooks] = useState([]);
  const [viewingShelf, setViewingShelf] = useState("all");

  const { shelf } = useBookContext();

  useEffect(() => {
    if (viewingShelf) {
      const filtered =
        viewingShelf === "finished"
          ? shelf.filter((b) => b.status === "finished")
          : viewingShelf === "tbr"
          ? shelf.filter((b) => b.status === "tbr")
          : viewingShelf === "reading"
          ? shelf.filter((b) => b.status === "reading")
          : shelf;
      setBooks(filtered);
    }
  }, [shelf, viewingShelf]);

  const total = shelf.length;
  const tbrCount = shelf.filter((b) => b.status === "tbr").length;
  const readingCount = shelf.filter((b) => b.status === "reading").length;
  const finishedCount = shelf.filter((b) => b.status === "finished").length;

  return (
    <div className="my-shelf">
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
          <BookCard book={book} key={book.id} />
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
