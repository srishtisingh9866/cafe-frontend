import React from 'react';
import './Footer.css'; // Import the CSS file

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>MyShop</h3>
        <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
        <div className="footer-links">
          <a href="mailto:support@myshop.com">Contact</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}