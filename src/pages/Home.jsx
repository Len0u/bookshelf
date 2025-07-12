import { useState, useEffect } from "react";
import { searchBooks } from "../services/api";
import BookCard from "../components/BookCard";
import SearchBookCard from "../components/SearchBookCard";
import { useBookContext } from "../contexts/BookContext";
import WelcomeMessage from "../components/WelcomeMessage";
import ProgressBar from "../components/ProgressBar";
import CurrentReads from "../components/CurrentReads";
import TbrSuggestions from "../components/TbrSuggestions";
import "../css/Home.css"

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { shelf } = useBookContext();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const searchResults = await searchBooks(searchQuery);
      setBooks(searchResults);
    } catch (err) {
      setError("Failed to search books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Clear search results when query is empty
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setBooks([]);
      setError("");
    }
  }, [searchQuery]);

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for books..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {searchQuery && books.length > 0 ? (
        <div className="search-results">
          <h2>Search Results for "{searchQuery}"</h2>
          <div className="search-book-grid">
            {books.map((book) => (
              <SearchBookCard book={book} key={book.id} />
            ))}
          </div>
        </div>
      ) : searchQuery && error ? (
        <div className="error-message">
          <p>{error}</p>
        </div>
      ) : searchQuery && loading ? (
        <div className="loading-message">
          <p>Searching for books...</p>
        </div>
      ) : searchQuery && books.length === 0 ? (
        <div className="no-results">
          <p>No books found for "{searchQuery}"</p>
        </div>
      ) : (
        <div className="home-dashboard">
          <WelcomeMessage />
          <ProgressBar />
          <CurrentReads />
          <TbrSuggestions />
        </div>
      )}
    </div>
  );
}

export default Home;
