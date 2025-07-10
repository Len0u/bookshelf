const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./config/dbConnection")
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes")

connectDb();

const app = express();
const port = 5001;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json()); // Parses incoming JSON



// Add a test route to check if server is accessible
app.get("/test", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
