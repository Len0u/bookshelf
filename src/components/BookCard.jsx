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
    updateStartDate,
    updateEndDate,
  } = useBookContext();
  const shelved = onShelf(book.googleBookId);
  const shelfBook = shelf.find((b) => b.googleBookId === book.googleBookId);
  const [editingReview, setEditingReview] = useState(false);
  const [reviewText, setReviewText] = useState(shelfBook?.review || "");
  const [showFullReview, setShowFullReview] = useState(false);

  const handleSave = () => {
    updateReview(book.googleBookId, reviewText);
    setEditingReview(false);
  };

  const onShelfClick = (e) => {
    e.preventDefault();
    if (shelved) removeFromShelf(book.googleBookId);
    else addToShelf(book);
  };

  const handleRatingClick = (value) => {
    updateRating(book.googleBookId, value);
  };

  const handleStartDateChange = (e) => {
    updateStartDate(book.googleBookId, e.target.value);
  };

  const handleEndDateChange = (e) => {
    updateEndDate(book.googleBookId, e.target.value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="book-card">
      <div className="book-left-section">
        <div className="book-thumbnail">
          {book.image && (
            <img src={book.image} alt={book.title || "No title"} />
          )}
          <div className="book-overlay">
            <button
              className="shelf-btn"
              onClick={onShelfClick}
              title={shelved ? "Remove from shelf" : "Add to shelf"}
            >
              {shelved ? "X" : "+"}
            </button>
          </div>
        </div>

        <div className="book-basic-info">
          <h3>{book.title}</h3>
          <p className="authors">{book.author}</p>
          {shelved && (
            <div className="status-section">
              <select
                className={`status-dropdown ${shelfBook?.status || "tbr"}`}
                value={shelfBook?.status || "tbr"}
                onChange={(e) => updateStatus(book.googleBookId, e.target.value)}
              >
                <option value="tbr">To Be Read</option>
                <option value="reading">Reading</option>
                <option value="finished">Finished</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {shelved && (
        <div className="book-details">
          {/* Date inputs */}
          <div className="date-inputs">
            <label className="date-label">
              Start Date:
              <input
                type="date"
                value={shelfBook?.startDate || ""}
                onChange={handleStartDateChange}
                className="date-input"
              />
            </label>

            <label className="date-label">
              End Date:
              <input
                type="date"
                value={shelfBook?.endDate || ""}
                onChange={handleEndDateChange}
                className="date-input"
              />
            </label>
          </div>

          <div className="rating-section">
            <label className="rating-label">
              Rating:
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <FaStar
                    key={value}
                    onClick={() =>
                      handleRatingClick(value === shelfBook?.rating ? 0 : value)
                    }
                    color={
                      value <= (shelfBook?.rating || 0) ? "#ffc107" : "#e4e5e9"
                    }
                    size={20}
                  />
                ))}
              </div>
            </label>
          </div>

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
        </div>
      )}
    </div>
  );
}

export default BookCard;
