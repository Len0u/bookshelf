import { useBookContext } from "../contexts/BookContext";
import GenrePieChart from "../components/GenrePieChart";
import RatingsPieChart from "../components/RatingsPieChart";
import ReadingTimeline from "../components/ReadingTimeline";
import ProgressBar from "../components/ProgressBar";
import "../css/ReadingGoals.css";

function ReadingStats() {
  const { shelf, readingGoal, setReadingGoal } =
    useBookContext();

  const handleChange = (e) => {
    setReadingGoal(Number(e.target.value));
  };

  const handleIncrement = () => {
    setReadingGoal(readingGoal + 1);
  };

  const handleDecrement = () => {
    if (readingGoal > 0) {
      setReadingGoal(readingGoal - 1);
    }
  };

  const ratedBooks = shelf.filter((b) => b.rating > 0);
  const avgRating =
    ratedBooks.length > 0
      ? (
          ratedBooks.reduce((sum, b) => sum + b.rating, 0) / ratedBooks.length
        ).toFixed(1)
      : null;

  const genreCounts = {};
  shelf.forEach((b) => {
    const genre = b.genre || "";

    genreCounts[genre] = (genreCounts[genre] || 0) + 1;
  });

  const topGenre =
    Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  return (
    <div className="reading-goals-container">
      <div className="reading-stats">
        <div className="goal-section">
          <h2>{new Date().getFullYear()} Reading Goal</h2>
          <p className="goal-description">
            Set your reading target for this year and track your progress!
          </p>

          <div className="goal-input-container">
            <div className="goal-input-group">
              <label className="goal-label">
                Books you want to finish this year:
              </label>
              <div className="goal-input-wrapper">
                <button
                  className="goal-btn goal-btn-decrement"
                  onClick={handleDecrement}
                  disabled={readingGoal <= 0}
                >
                  −
                </button>
                <input
                  type="number"
                  value={readingGoal}
                  onChange={handleChange}
                  min="0"
                  className="goal-input"
                  placeholder="Enter your goal"
                />
                <button
                  className="goal-btn goal-btn-increment"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <ProgressBar />
      </div>
      <div className="reading-stats">
        <div className="pie-charts">
          <div className="rating-pie-chart">
            {avgRating && <p>Average Rating: {avgRating} ⭐</p>}
            <RatingsPieChart />
          </div>
          <div className="genre-pie-chart">
            {topGenre && <p>Most Read Genre: {topGenre}</p>}
            <GenrePieChart />
          </div>
        </div>
      </div>
      <ReadingTimeline />
    </div>
  );
}

export default ReadingStats;
