import "../css/BookCard.css";
import { useBookContext } from "../contexts/BookContext";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

function BookCard({ book }) {
  const {
    shelf,
    onShelf,
    addToShelf,
    removeFromShelf,
    updateStatus,
    updateRating,
    updateReview,
  } = useBookContext();
  const shelved = onShelf(book.id);
  const info = book.volumeInfo;
  const shelfBook = shelf.find((b) => b.id === book.id);
  const [editingReview, setEditingReview] = useState(false);
  const [reviewText, setReviewText] = useState(shelfBook?.review || "");
  const [showFullReview, setShowFullReview] = useState(false);

  const handleSave = () => {
    updateReview(book.id, reviewText);
    setEditingReview(false);
  };

  const onShelfClick = (e) => {
    e.preventDefault();
    if (shelved) removeFromShelf(book.id);
    else addToShelf(book);
  };

  const handleRatingClick = (value) => {
    updateRating(book.id, value);
  };

  return (
    <div className="book-card">
      <div className="book-thumbnail">
        {info.imageLinks?.thumbnail && (
          <img src={info.imageLinks.thumbnail} alt={info.title} />
        )}
        <div className="book-overlay">
          <button
            className="shelf-btn" //{`shelf-btn ${shelved ? "-active" : ""}`}
            onClick={onShelfClick}
            title={shelved ? "Remove from shelf" : "Add to shelf"}
          >
            {shelved ? "X" : "+"}
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
            <label className="rating-label">
              Rating:
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <FaStar
                    key={value}
                    onClick={() => handleRatingClick(value)}
                    color={
                      value <= (shelfBook?.rating || 0) ? "#ffc107" : "#e4e5e9"
                    }
                    size={20}
                  />
                ))}
              </div>
            </label>

            {editingReview ? (
              <div className="review-text-box">
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your thoughts..."
                  className="review-text-area"
                />
                <button onClick={handleSave} className="save-review-button">
                  Save
                </button>
              </div>
            ) : shelfBook?.review ? (
              <div className="review-text">
                <p className={showFullReview ? "expanded" : "collapsed"}>
                  {shelfBook.review}
                </p>
                <div className="review-text-actions">
                <button onClick={() => setShowFullReview(!showFullReview)}>
                  {showFullReview ? "Show Less" : "Show More"}
                </button>
                <button
                  onClick={() => {
                    setEditingReview(true);
                    setReviewText(shelfBook.review);
                  }}
                  className="edit-review-button"
                >
                  Edit
                </button>
                </div>
              </div>
            ) : (
              <div className="review-placeholder">
                <button
                  onClick={() => setEditingReview(true)}
                  className="add-review-button"
                >
                  Add Review
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default BookCard;
