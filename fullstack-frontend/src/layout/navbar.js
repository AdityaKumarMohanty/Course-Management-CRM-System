import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Navbar.css'; // Import custom CSS

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Debugging to see what's in localStorage
    console.log("localStorage isAdmin:", localStorage.getItem("isAdmin"));

    // Check admin status from localStorage
    const adminStatus = localStorage.getItem("isAdmin");
    if (adminStatus === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.add("dark-mode-bg");
      document.body.classList.remove("light-mode-bg");
    } else {
      document.body.classList.add("light-mode-bg");
      document.body.classList.remove("dark-mode");
      document.body.classList.remove("dark-mode-bg");
    }
  }, [darkMode]);

  return (
    <div>
      <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-dark bg-primary"} navbar-small`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            CRM System
          </Link>
          <Link className="btn btn-outline-light me-2" to="/home">Home</Link>
          <Link className="btn btn-outline-light me-2" to="/aboutus">About Us</Link>
          <Link className="btn btn-outline-light me-2" to="/contactus">Contact Details</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="d-flex ms-auto">
            {isAdmin ? (
              <>
                <Link className="btn btn-outline-light me-2" to="/adduser">Add Employee</Link>
                <Link className="btn btn-outline-light me-2" to="/addproduct">Add Product</Link>
                <Link className="btn btn-outline-light me-2" to="/viewproducts">View Products</Link>
                <Link className="btn btn-outline-light me-2" to="/viewsales">View Sales</Link>
              </>
            ) : (
              <span className="text-light">Admin options hidden</span>
            )}
            <button className="btn btn-toggle-dark-mode" onClick={toggleDarkMode}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
