import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check for specific email and password
    if (username === "admin@gmail.com" && password === "Admin@123") {
      localStorage.setItem("isAdmin", "true"); // Set admin status in local storage
      navigate("/home"); // Redirect to home page after successful login
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </form>
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: calc(100vh - 60px); /* Adjust height to account for the footer */
          background-image: url('https://www.example.com/path-to-your-background-image.jpg'); /* Update with your image URL */
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          padding-top: 20px; /* Add some padding at the top */
        }

        .login-form {
          background-color: rgba(255, 255, 255, 0.9); /* Slight transparency for readability */
          border-radius: 8px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
          padding: 2rem;
          max-width: 400px;
          width: 100%;
        }

        .login-form h2 {
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          color: #333;
        }

        .form-label {
          font-weight: bold;
        }

        .form-control {
          border-radius: 5px;
        }

        .btn-primary {
          background-color: #007bff;
          border-color: #007bff;
        }

        .btn-primary:hover {
          background-color: #0056b3;
          border-color: #004085;
        }

        .alert-danger {
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
