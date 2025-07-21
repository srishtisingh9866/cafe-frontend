import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./Admin.css"; // Import the CSS file

export default function Admin() {
  const location = useLocation();
  return (
    <div>
      <nav className="admin-nav">
        <Link to="/admin" className={location.pathname === "/admin" ? "active" : ""}>Users</Link>
        <Link to="/admin/products" className={location.pathname === "/admin/products" ? "active" : ""}>Products</Link>
        <Link to="/admin/orders" className={location.pathname === "/admin/orders" ? "active" : ""}>Orders</Link>
      </nav>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}