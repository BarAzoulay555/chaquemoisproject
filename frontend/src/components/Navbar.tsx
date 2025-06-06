import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">CHAQUEMOIS</Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">דף הבית</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/suppliers">ספקים</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/orders">הזמנות</Link>
          </li>
        </ul>
        <Link className="btn btn-outline-light" to="/login">התנתקות</Link>
      </div>
    </nav>
  );
}
