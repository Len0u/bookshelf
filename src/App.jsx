import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Shelf from "./pages/Shelf";
import ReadingStats from "./pages/ReadingStats";
import BookCard from "./components/BookCard";
import { BookProvider } from "./contexts/BookContext";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./css/App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return (
    <BookProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shelf" element={<Shelf />} />
          <Route path="/goals" element={<ReadingStats />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </main>
    </BookProvider>
  );
}

export default App;
