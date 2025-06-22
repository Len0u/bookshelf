import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import BookCard from "./components/BookCard";
import { BookProvider } from "./contexts/BookContext";

function App() {
  return (
    <BookProvider>
      <main className="main-content">
        <Home />
      </main>
    </BookProvider>
  );
}

export default App;
