import "../css/SearchBookCard.css";
import { useBookContext } from "../contexts/BookContext";
import { useState } from "react";

function SearchBookCard({ book }) {
  const { onShelf, addToShelf, removeFromShelf } = useBookContext();
  const shelved = onShelf(book.id);
  const info = book.volumeInfo;

  const onShelfClick = (e) => {
    e.preventDefault();
    if (shelved) removeFromShelf(book.id);
    else addToShelf(book);
  };

  return (
    <div className="search-book-card">
      <div className="book-thumbnail">
        {info.imageLinks?.thumbnail && (
          <img src={info.imageLinks.thumbnail} alt={info.title} />
        )}
        <div className="book-overlay">
          <button
            className={`shelf-btn ${shelved ? "on-shelf" : ""}`}
            onClick={onShelfClick}
            title={shelved ? "Remove from shelf" : "Add to shelf"}
          >
            {shelved ? "✓" : "+"}
          </button>
        </div>
      </div>
      
      <div className="book-info">
        <h3>{info.title}</h3>
        <p className="authors">{info.authors?.join(", ")}</p>
        {info.publishedDate && (
          <p className="published-date">{info.publishedDate.substring(0, 4)}</p>
        )}
        {info.pageCount && (
          <p className="page-count">{info.pageCount} pages</p>
        )}
        {info.description && (
          <p className="description">
            {info.description.length > 150 
              ? `${info.description.substring(0, 150)}...` 
              : info.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchBookCard; 