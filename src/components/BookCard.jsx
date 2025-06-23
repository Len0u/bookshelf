import "../css/BookCard.css"
import { useBookContext } from "../contexts/BookContext";

function BookCard({ book }) {
  const { shelf, onShelf, addToShelf, removeFromShelf, updateStatus } =
    useBookContext();
  const shelved = onShelf(book.id);
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
            className= "shelf-btn" //{`shelf-btn ${shelved ? "-active" : ""}`}
            onClick={onShelfClick}
            title={shelved ? "Remove from shelf" : "Add to shelf"}
          >
            {shelved ? "-" : "+"}
          </button>
        </div>
      </div>
      <div className="book-info">
        <h3>{info.title}</h3>
        <p>{info.authors}</p>
        {shelved && (
          <>
            <label>
              Status:{" "}
              <select
                className={`status-dropdown ${shelfBook?.status || "tbr"}`}
                value={shelfBook?.status || "tbr"}
                onChange={(e) => updateStatus(book.id, e.target.value)}
              >
                <option value="tbr">To Be Read</option>
                <option value="reading">Reading</option>
                <option value="finished">Finished</option>
              </select>
            </label>
          </>
        )}
      </div>
    </div>
  );
}

export default BookCard;
