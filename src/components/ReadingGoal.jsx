import { useBookContext } from "../contexts/BookContext";
import GenrePieChart from "./GenrePieChart";
import RatingsPieChart from "./RatingsPieChart";
import "../css/ReadingGoals.css";

function ReadingGoal() {
  const { shelf, readingGoal, setReadingGoal, finishedCount } =
    useBookContext();

  const progress =
    readingGoal === 0 ? 0 : Math.min(100, (finishedCount / readingGoal) * 100);

  const handleChange = (e) => {
    setReadingGoal(Number(e.target.value));
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
    const genres = b.volumeInfo?.categories || [];
    genres.forEach((g) => {
      genreCounts[g] = (genreCounts[g] || 0) + 1;
    });
  });

  const topGenre =
    Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  return (
    <div className="reading-stats">
      <h2>Reading Goal</h2>
      <label>
        Books you want to finish this year:{" "}
        <input
          type="number"
          value={readingGoal}
          onChange={handleChange}
          min="0"
        />
      </label>
      <p>
        {finishedCount} of {readingGoal} books finished
      </p>
      
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="progress-label">{progress.toFixed(0)}% completed</p>

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
  );
}

export default ReadingGoal;
