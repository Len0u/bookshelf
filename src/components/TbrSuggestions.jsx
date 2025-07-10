import { useBookContext } from "../contexts/BookContext";
import BookCard from "./BookCard";

function TbrSuggestions() {
  const { shelf } = useBookContext();
  
  const tbrBooks = shelf.filter(book => book.status === "tbr");

  if (tbrBooks.length === 0) {
    return (
      <div className="tbr-suggestions-section">
        <h2>TBR Suggestions</h2>
        <div className="no-tbr-books">
          <p>No books in your TBR list</p>
          <p className="suggestion">Search for books and add them to your TBR to get suggestions!</p>
        </div>
      </div>
    );
  }

  // Show up to 3 TBR books as suggestions
  const suggestedBooks = tbrBooks.slice(0, 3);

  return (
    <div className="tbr-suggestions-section">
      <h2>TBR Suggestions ({tbrBooks.length} total)</h2>
      <p className="tbr-subtitle">Ready to start your next adventure?</p>
      
      <div className="tbr-suggestions-grid">
        {suggestedBooks.map((book) => (
          <BookCard book={book} key={book.googleBookId || book._id || book.id} />
        ))}
      </div>
      
      {tbrBooks.length > 3 && (
        <div className="more-tbr">
          <p>And {tbrBooks.length - 3} more books in your TBR...</p>
        </div>
      )}
    </div>
  );
}

export default TbrSuggestions; 