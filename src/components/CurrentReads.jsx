import { useBookContext } from "../contexts/BookContext";
import BookCard from "./BookCard";

function CurrentReads() {
  const { shelf } = useBookContext();
  
  const currentReads = shelf.filter(book => book.status === "reading");

  if (currentReads.length === 0) {
    return (
      <div className="current-reads-section">
        <h2>Currently Reading</h2>
        <div className="no-current-reads">
          <p>No books currently being read</p>
          <p className="suggestion">Start reading a book from your TBR to see it here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="current-reads-section">
      <h2>Currently Reading ({currentReads.length})</h2>
      <div className="current-reads-grid">
        {currentReads.map((book) => (
          <BookCard book={book} key={book.googleBookId} />
        ))}
      </div>
    </div>
  );
}

export default CurrentReads; 