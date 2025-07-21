import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import "./Header.css";

export default function Header() {
  const { user } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen((open) => !open);

  // Close menu on navigation (optional, for better UX)
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header>
      <div className="header-container">
        <h1>
          <Link to="/" className="logo" onClick={handleNavClick}>
            MERN Frontend
          </Link>
        </h1>
        <div className="hamburger" onClick={handleMenuToggle}>
          <span />
          <span />
          <span />
        </div>
        <nav className="navbar">
          <ul className={menuOpen ? "open" : ""}>
            <li>
              <Link to="/" onClick={handleNavClick}>Home</Link>
            </li>
            <li>
              <Link to="/cart" onClick={handleNavClick}>MyCart</Link>
            </li>
            <li>
              <Link to="/order" onClick={handleNavClick}>MyOrder</Link>
            </li>
            {user?.role === "admin" && (
              <li>
                <Link to="/admin" onClick={handleNavClick}>Admin</Link>
              </li>
            )}
            <li>
              {user?.token ? (
                <Link to="/profile" onClick={handleNavClick}>Profile</Link>
              ) : (
                <Link to="/login" onClick={handleNavClick}>Login</Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}