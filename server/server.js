const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./config/dbConnection")
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes")

connectDb();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON



app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
