import { useState, useEffect } from "react";
import { searchBooks } from "../services/api";
import BookCard from "../components/BookCard";
import { useBookContext } from "../contexts/BookContext";
import ReadingGoal from "../components/ReadingGoal";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); //jsut because i don'e have a main paige to yeet this to false
  const [viewingShelf, setViewingShelf] = useState("home");

  const { shelf } = useBookContext();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await searchBooks(searchQuery);
      setBooks(searchResults);
      setError(null);
      setViewingShelf("");
    } catch (err) {
      console.log(err);
      setError("Failed to search movies");
    } finally {
      setLoading(false);
    }
  };
  const applyShelfFilter = (filter) => {
    setSearchQuery("");
    setError(null);
    switch (filter) {
      case "finished":
        return shelf.filter((book) => book.finished);
      case "tbr":
        return shelf.filter((book) => book.tbr);
      default:
        return shelf;
    }
  };

  useEffect(() => {
    if (viewingShelf) {
      setBooks(applyShelfFilter(viewingShelf));
    }
  }, [shelf, viewingShelf]);

  return (
    <div className="home">
      <ReadingGoal />
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for books..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <button
        type="button"
        className="view-shelf-button"
        onClick={() => setViewingShelf("home")}
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

      {error && <div className="error-message"> {error} </div>}

      {loading ? (
        <div className="loading"> Loading...</div>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
      )}

    {books.length === 0 && <p>No books to show</p>}
    </div>
  );
}

export default Home;
