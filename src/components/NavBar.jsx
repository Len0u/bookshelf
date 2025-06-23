import {Link} from "react-router-dom"

function NavBar() {
  return <nav className="navbar">
    <div>
        <Link to="/">Search</Link>
        <Link to="/shelf">My Shelf</Link>
        <Link to="/goals">Reading Goals</Link>
        </div>

  </nav>
}

export default NavBar