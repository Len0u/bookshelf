const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Database connected ", connect.connection.host, connect.connection.name)
  } catch(err) {
    console.log("Database connection failed:", err.message);
    console.log("Server will start but database operations will fail.");
    console.log("Please check your MongoDB Atlas IP whitelist or use a local MongoDB instance.");
    // Don't exit the process, let the server start without database
  }
}

module.exports = connectDb;