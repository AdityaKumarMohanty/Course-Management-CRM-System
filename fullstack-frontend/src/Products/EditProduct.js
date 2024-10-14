import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    tutor: { id: "" }, // Change tutor to be an object with id
  });

  const [tutors, setTutors] = useState([]); // State for the list of tutors
  const { name, description, price, tutor } = product;

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadProduct();
    loadTutors(); // Load tutors when the component mounts
  }, []);

  const loadProduct = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/product/${id}`);
      setProduct(result.data);
    } catch (error) {
      console.error("There was an error fetching the product!", error);
    }
  };

  const loadTutors = async () => {
    try {
      const result = await axios.get("http://localhost:8080/users"); // Adjust the URL to your tutors endpoint
      setTutors(result.data);
    } catch (error) {
      console.error("There was an error fetching the tutors!", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting product:", product); // Check the product object being submitted
      const response = await axios.put(`http://localhost:8080/product/${id}`, product);
      console.log("Response from server:", response.data); // Log the response from the server
      navigate("/viewproducts");
    } catch (error) {
      console.error("There was an error updating the product:", error);
      alert("Error updating product, please try again."); // Provide user feedback
    }
  };

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // Clear admin session
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Product</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={name}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                name="description"
                value={description}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Price" className="form-label">
                Price (₹)
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                name="price"
                value={price}
                onChange={onInputChange}
              />
            </div>

            {/* Dropdown for Tutor Selection */}
            <div className="mb-3">
              <label htmlFor="Tutor" className="form-label">
                Assigned Tutor
              </label>
              <select
                className="form-select"
                name="tutor"
                value={tutor.id} // Use the tutor's id
                onChange={(e) => setProduct({ ...product, tutor: { id: e.target.value } })} // Update tutor as an object with id
              >
                <option value="">Select Tutor</option>
                {tutors.map((tutor) => (
                  <option key={tutor.id} value={tutor.id}> {/* Use tutor.id for value */}
                    {tutor.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link type="button" className="btn btn-outline-danger mx-2" to="/viewproducts">
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
