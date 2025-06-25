import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useBookContext } from "../contexts/BookContext";

const COLORS = ["#FF9CCF", "#7ED7FF", "#FFE799", "#9FD79D", "#BCA3E3", "#FF8C7A"];


function RatingsPieChart() {
  const { shelf } = useBookContext();


  const ratingCounts = Array(5).fill(0);;

  // Count each rating (1 to 5)
  shelf.forEach((book) => {
    const rating = book.rating;
    if (rating > 0) {
      ratingCounts[rating - 1] += 1;
    }
  });
  
  // Convert the counts to chart data format
  const data = Object.entries(ratingCounts).map(([rating, count]) => ({
    name: `${Number(rating) + 1} Star${rating > 0 ? "s" : ""}`,
    value: count,
  }));
  
  // Fallback UI
  if (data.length === 0) return <p> No rating data available</p>;
  

  return (
    <div style={{ width: "100%", maxWidth: "500px", margin: "2rem auto" }}>
      <h3 style={{ textAlign: "center" }}>Books ByYour Ratings</h3>
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

export default RatingsPieChart;
