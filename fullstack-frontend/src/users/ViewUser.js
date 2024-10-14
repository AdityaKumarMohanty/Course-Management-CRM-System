import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    courses: [] // Initialize courses as an empty array
  });

  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/user/${id}`);
      setUser(result.data);
    } catch (error) {
      console.error("There was an error fetching the user!", error);
    }
  };

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // Clear admin session
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of User with ID: {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b> {user.name}
                </li>
                <li className="list-group-item">
                  <b>Username:</b> {user.username}
                </li>
                <li className="list-group-item">
                  <b>Email:</b> {user.email}
                </li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title">Assigned Courses:</h5>
              <ul className="list-group">
                {user.courses && user.courses.length > 0 ? (
                  user.courses.map((course, index) => (
                    <li className="list-group-item" key={index}>
                      {course}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">No courses assigned</li>
                )}
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/home"}>
            Home
          </Link>
        </div>
      </div>

      {/* Logout Button */}
      <button
        className="btn btn-danger position-fixed bottom-0 end-0 m-3"
        style={{ zIndex: 1000 }} // Ensure the button is on top
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
