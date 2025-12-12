import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

function Navbar({ user, isAdmin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const getUserInitials = () => {
    if (!user?.name) return "U";
    const names = user.name.trim().split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  const searchSuggestions = [
    "Gulab Jamun",
    "Rasgulla",
    "Jalebi",
    "Kaju Katli",
    "Laddu",
    "Barfi",
    "Rasmalai",
    "Peda",
    "Mysore Pak",
    "Cham Cham",
  ];

  const filteredSuggestions = searchSuggestions.filter((sweet) =>
    sweet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
      setShowSuggestions(false);
      setSearchTerm("");
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    navigate(`/?search=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    if (searchTerm) setShowSuggestions(true);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(e.target.value.length > 1);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand" onClick={() => setMobileMenu(false)}>
          <span className="brand-text">Bite of India</span>
          <span className="brand-tag">- Sweet Paradise 🇮🇳</span>
        </Link>
        <div className="nav-search-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search mithai... (Gulab Jamun, Jalebi...)"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </form>

          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="search-suggestions">
              {filteredSuggestions.slice(0, 6).map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="suggestion-icon">🍮</span>
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="nav-right">
          <div className="nav-links-desktop">
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
            <Link to="/career" className="nav-link">
              Career
            </Link>
            <Link
              to="/cart"
              className="nav-link cart-link"
              data-count={cartCount}
            >
              Cart ({cartCount})
            </Link>
            {isAdmin && (
              <Link to="/admin" className="nav-link admin-link">
                Dashboard
              </Link>
            )}
          </div>
          {user ? (
            <Link
              to="/profile"
              className="profile-btn-simple"
              onClick={() => setMobileMenu(false)}
            >
              {getUserInitials()}
            </Link>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
        <button
          className="nav-toggle"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <span className="nav-toggle-line"></span>
          <span className="nav-toggle-line"></span>
          <span className="nav-toggle-line"></span>
        </button>
      </div>
      <div className={`nav-menu-mobile ${mobileMenu ? "active" : ""}`}>
        <Link
          to="/"
          className="nav-link-mobile home-link"
          onClick={() => setMobileMenu(false)}
        >
          🏠 Home
        </Link>
        <Link
          to="/about"
          className="nav-link-mobile"
          onClick={() => setMobileMenu(false)}
        >
          About
        </Link>
        <Link
          to="/contact"
          className="nav-link-mobile"
          onClick={() => setMobileMenu(false)}
        >
          Contact
        </Link>
        <Link
          to="/career"
          className="nav-link-mobile"
          onClick={() => setMobileMenu(false)}
        >
          Career
        </Link>
        <Link
          to="/cart"
          className="nav-link-mobile cart-link"
          onClick={() => setMobileMenu(false)}
        >
          🛒 Cart ({cartCount})
        </Link>
        {isAdmin && (
          <Link
            to="/admin"
            className="nav-link-mobile admin-link"
            onClick={() => setMobileMenu(false)}
          >
            Dashboard
          </Link>
        )}
        {user ? (
          <>
            <Link
              to="/profile"
              className="nav-link-mobile"
              onClick={() => setMobileMenu(false)}
            >
              Profile
            </Link>
            <button onClick={handleLogout} className="nav-logout-mobile">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="nav-link-mobile"
              onClick={() => setMobileMenu(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="nav-link-mobile"
              onClick={() => setMobileMenu(false)}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
