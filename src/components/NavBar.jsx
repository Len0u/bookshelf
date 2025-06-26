import "../css/NavBar.css"
import { Link, useLocation } from "react-router-dom"
import { FaHome, FaBookOpen, FaChartBar } from "react-icons/fa"

function NavBar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="brand-icon">📚</span>
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
        </div>
      </div>
    </nav>
  )
}

export default NavBar