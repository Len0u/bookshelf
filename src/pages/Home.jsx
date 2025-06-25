import { useState, useEffect } from "react";
import { searchBooks } from "../services/api";
import BookCard from "../components/BookCard";
import { useBookContext } from "../contexts/BookContext";
import ReadingGoal from "../components/ReadingGoal";
import Shelf from "./Shelf";
import "../css/Home.css"

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false); //jsut because i don'e have a main paige to yeet this to false

  const { shelf } = useBookContext();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true); 
    try {
      const searchResults = await searchBooks(searchQuery);
      setBooks(searchResults);
    } catch (err) {
      console.log(err);
      setError("Failed to search books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setBooks([]);  // Clear old results if search input is empty
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
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {searchQuery && books.length > 0 ? (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
      ) : (
        <Shelf />
      )}
    </div>
  );
}

export default Home;
