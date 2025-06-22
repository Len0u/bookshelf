import { useBookContext } from "../contexts/BookContext";

function BookCard({ book }) {
  const { shelf, onShelf, addToShelf, removeFromShelf, toggleFinished } = useBookContext();
  const shelved = onShelf(book.id)
  const info = book.volumeInfo;
  const shelfBook = shelf.find((b) => b.id === book.id);
  
  const onShelfClick = (e) => {
    e.preventDefault();
    if (shelved) removeFromShelf(book.id);
    else addToShelf(book);
  };
  return (
    <div className="book-card">
      <div className="book-thumbnail">
        {info.imageLinks?.thumbnail && (
          <img src={info.imageLinks.thumbnail} alt={info.title} />
        )}
        <div className="book-overlay">
          <button
            className={`shelf-btn ${shelved ? "-active" : ""}`}
            onClick={onShelfClick}
          >
            +
          </button>
        </div>
      </div>
      <div className="book-info">
        <h3>{info.title}</h3>
        <p>{info.authors}</p>
        {shelved && (
          <label>
            <input
              type="checkbox"
              checked={shelfBook.finished}
              onChange={() => toggleFinished(book.id)}
            />
            Finished
          </label>
        )}
      </div>
    </div>
  );
}

export default BookCard;
