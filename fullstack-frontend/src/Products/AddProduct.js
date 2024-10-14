import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddProduct() {
  let navigate = useNavigate();

  // Initializing the product state with default values
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    tutor: null, // Changed to null to hold the tutor object
  });

  // State to hold the list of tutors fetched from the backend
  const [tutors, setTutors] = useState([]);

  // Destructuring values from the product object
  const { name, description, price, tutor } = product;

  // Fetch the list of tutors when the component loads
  useEffect(() => {
    const fetchTutors = async () => {
      const result = await axios.get("http://localhost:8080/users"); // Assuming this endpoint returns the list of users/tutors
      setTutors(result.data); // Set the tutors from the response
    };

    fetchTutors();
  }, []);

  // Handling input changes
  const onInputChange = (e) => {
    const { name, value } = e.target;

    // If the input name is 'tutor', update it differently
    if (name === "tutor") {
      const selectedTutor = tutors.find((tutor) => tutor.name === value);
      setProduct({ ...product, tutor: selectedTutor || null });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  // Handling form submission to add the new product
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/product", {
      ...product,
      tutor: product.tutor ? { id: product.tutor.id } : null, // Include tutor ID in the payload
    });
    navigate("/viewproducts"); // Redirect to products page after submission
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
          <h2 className="text-center m-4">Add Product</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Description" className="form-label">
                Product Description
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product description"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Price" className="form-label">
                Product Price
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter product price"
                name="price"
                value={price}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            {/* Tutor dropdown */}
            <div className="mb-3">
              <label htmlFor="Tutor" className="form-label">
                Assign Tutor
              </label>
              <select
                className="form-select"
                name="tutor"
                value={tutor ? tutor.name : ""}
                onChange={(e) => onInputChange(e)}
              >
                <option value="">Select a tutor</option>
                {tutors.map((tutor) => (
                  <option key={tutor.id} value={tutor.name}>
                    {tutor.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/viewproducts">
              Cancel
            </Link>
          </form>
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
