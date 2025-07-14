import Home from "./pages/Home";
import Shelf from "./pages/Shelf";
import ReadingStats from "./pages/ReadingStats";
import { BookProvider } from "./contexts/BookContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./css/App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Protected Route Component - ensures users are authenticated before accessing protected pages
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shelf" element={
              <ProtectedRoute>
                <Shelf />
              </ProtectedRoute>
            } />
            <Route path="/goals" element={
              <ProtectedRoute>
                <ReadingStats />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

          </Routes>
        </main>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;
