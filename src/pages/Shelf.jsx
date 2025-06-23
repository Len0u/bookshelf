import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import { useBookContext } from "../contexts/BookContext";

function Shelf() {
  const [books, setBooks] = useState([]);
  const [viewingShelf, setViewingShelf] = useState("all");

  const { shelf } = useBookContext();

  useEffect(() => {
    if (viewingShelf) {
      const filtered =
        viewingShelf === "finished"
          ? shelf.filter((b) => b.finished)
          : viewingShelf === "tbr"
          ? shelf.filter((b) => b.tbr)
          : shelf;
      setBooks(filtered);
    }
  }, [shelf, viewingShelf]);

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
        className="view-finishedshelf-button"
        onClick={() => setViewingShelf("finished")}
      >
        Finished Books
      </button>

      <button
        type="button"
        className="view-tbrshelf-button"
        onClick={() => setViewingShelf("tbr")}
      >
        TBR
      </button>

      <h2>
        {viewingShelf === "all"
          ? "All Books"
          : viewingShelf === "finished"
          ? "Finished Books"
          : "To Be Read"}
      </h2>
      <div className="book-grid">
        {books.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>

      {books.length === 0 && <p>No books to show</p>}
    </div>
  );
}

export default Shelf;
