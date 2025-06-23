import { useBookContext } from "../contexts/BookContext";

function ReadingGoal() {
  const { readingGoal, setReadingGoal, finishedCount } = useBookContext();

  const progress =
    readingGoal === 0 ? 0 : Math.min(100, (finishedCount / readingGoal) * 100);

  const handleChange = (e) => {
    setReadingGoal(Number(e.target.value));
  };

  return (
    <div className="reading-goal">
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
      <div
        style={{
          background: "#ddd",
          borderRadius: "1rem",
          height: "20px",
          width: "100%",
          marginTop: "0.5rem",
        }}
      >
        <div
          style={{
            background: "#4caf50",
            height: "100%",
            width: `${progress}%`,
            borderRadius: "1rem",
          }}
        />
      </div>
    </div>
  );
}

export default ReadingGoal;
