import { useState } from "react";
import { searchBooks } from "../services/api";
import BookCard from "../components/BookCard";
import { useBookContext } from "../contexts/BookContext";
import ReadingGoal from "../components/ReadingGoal";

function Home () {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); //jsut because i don'e have a main paige to yeet this to false

  const {shelf} = useBookContext()

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if (loading) return
    setLoading(true)
    try {
      const searchResults = await searchBooks(searchQuery)
      setBooks(searchResults)
      setError(null)
    } catch (err) {
      console.log(err)
      setError("Failed to search movies")
    } finally {
      setLoading(false);
    }
  };

  const handleViewShelf = () => {
    setSearchQuery("");
    setBooks(shelf);
    setError(null);
  };

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
          onClick={handleViewShelf}
        >
          View My Shelf
        </button>

      {error && <div className="error-message"> {error} </div>}

      {loading ? (
        <div className="loading"> Loading...</div>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard book = {book} key = {book.id} />
          ))}
        </div>
      )}
    </div>
  );


}

export default Home