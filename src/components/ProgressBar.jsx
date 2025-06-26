import { useBookContext } from "../contexts/BookContext";
import "../css/ProgressBar.css";

function ProgressBar({ variant = "default" }) {
  const { shelf, readingGoal, finishedCount } = useBookContext();

  const progress = readingGoal === 0 ? 0 : Math.min(100, (finishedCount / readingGoal) * 100);
  const booksRemaining = Math.max(0, readingGoal - finishedCount);
  const currentReads = shelf.filter(book => book.status === "reading").length;
  const tbrCount = shelf.filter(book => book.status === "tbr").length;

  return (
    <div className="progress-section">
      <div className="progress-header">
        <h2>Reading Progress</h2>
        <div className="progress-stats">
          <span className="stat-item">
            <span className="stat-number">{finishedCount}</span>
            <span className="stat-label">Finished</span>
          </span>
          <span className="stat-item">
            <span className="stat-number">{currentReads}</span>
            <span className="stat-label">Reading</span>
          </span>
          <span className="stat-item">
            <span className="stat-number">{tbrCount}</span>
            <span className="stat-label">TBR</span>
          </span>
        </div>
      </div>

      <div className="goal-progress">
        <div className="goal-info">
          <span className="goal-text">
            {finishedCount} of {readingGoal} books completed
          </span>
          <span className="goal-percentage">{progress.toFixed(0)}%</span>
        </div>
        
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {booksRemaining > 0 && (
          <p className="books-remaining">
            {booksRemaining} book{booksRemaining !== 1 ? 's' : ''} left to reach your goal!
          </p>
        )}
        
        {progress >= 100 && (
          <p className="goal-completed">
            🎉 Congratulations! You've reached your reading goal!
          </p>
        )}
      </div>
    </div>
  );
}

export default ProgressBar; 