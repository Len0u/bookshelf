import "../css/NavBar.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FaHome, FaBookOpen, FaChartBar, FaSignOutAlt } from "react-icons/fa"
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="brand-text">BookLog</span>
        </div>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            <FaHome className="nav-icon" />
            <span>Home</span>
          </Link>
          
          <Link 
            to="/shelf" 
            className={`nav-link ${isActive('/shelf') ? 'active' : ''}`}
          >
            <FaBookOpen className="nav-icon" />
            <span>My Shelf</span>
          </Link>
          
          <Link 
            to="/goals" 
            className={`nav-link ${isActive('/goals') ? 'active' : ''}`}
          >
            <FaChartBar className="nav-icon" />
            <span>Reading Stats</span>
          </Link>

          {!isAuthenticated && (
            <Link 
              to="/login" 
              className={`nav-link ${isActive('/login') ? 'active' : ''}`}
            >
              <span>Login</span>
            </Link>
          )}

          {isAuthenticated && (
            <button 
              onClick={handleLogout}
              className="nav-link logout-btn"
            >
              <FaSignOutAlt className="nav-icon" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar