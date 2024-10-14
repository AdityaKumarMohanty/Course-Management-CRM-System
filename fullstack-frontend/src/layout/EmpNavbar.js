import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Navbar.css'; // Import custom CSS

const EmployeeNavbar = () => {
  const [darkMode, setDarkMode] = useState(false);

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
    <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-dark bg-primary"} navbar-small`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/emp-home">
          Employee Dashboard
        </Link>
        <Link className="btn btn-outline-light me-2" to="/aboutus">About Us</Link>
        <Link className="btn btn-outline-light me-2" to="/contactus">Contact Us</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="d-flex ms-auto">
          <Link className="btn btn-outline-light me-2" to="/addstudent">Add Student</Link>
          <Link className="btn btn-outline-light me-2" to="/viewproductsemp">View Products</Link>
          <Link className="btn btn-outline-light me-2" to="/viewsales">View Sales</Link>
          <button className="btn btn-toggle-dark-mode" onClick={toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default EmployeeNavbar; // Ensure this line is present
