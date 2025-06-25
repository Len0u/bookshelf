import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useBookContext } from "../contexts/BookContext";

const COLORS = ["#FF9CCF", "#7ED7FF", "#FFE799", "#9FD79D", "#BCA3E3", "#FF8C7A"];

function GenrePieChart() {
  const { shelf } = useBookContext();

  // Flatten all genres
  const genreCounts = {};
  shelf.forEach((book) => {
    const categories = book.volumeInfo?.categories || [];
    categories.forEach((cat) => {
      const cleaned = cat.trim();
      genreCounts[cleaned] = (genreCounts[cleaned] || 0) + 1;
    });
  });

  const data = Object.entries(genreCounts).map(([genre, count]) => ({
    name: genre,
    value: count,
  }));

  if (data.length === 0) return <p>No genre data available</p>;

  return (
    <div style={{ width: "100%", maxWidth: "500px", margin: "2rem auto" }}>
      <h3 style={{ textAlign: "center" }}>Books by Genre</h3>
      <PieChart width={400} height={300}>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default GenrePieChart;
