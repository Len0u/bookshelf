import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${baseURL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // Registration successful, redirect to login
      navigate("/login");
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>
        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />
          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
        {error && <p className="auth-error">{error}</p>}
        <p className="auth-link">
          Already have an account?{' '}
          <Link to="/login">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
