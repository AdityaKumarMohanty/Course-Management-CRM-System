import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/navbar";
import Footer from "./layout/Footer";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";  
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import ViewProducts from "./Products/ViewProducts";
import Login from "./pages/Login";  
import EmployeeLogin from "./pages/EmployeeLogin"; // Import EmployeeLogin component
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AddProduct from "./Products/AddProduct";
import SalesChart from "./pages/SalesChart";
import EditProduct from "./Products/EditProduct";
import ViewProduct from "./Products/ViewProduct";
import UserSelection from "./pages/UserSelection"; // Import UserSelection component
import { useState } from "react";
import EmployeeHome from "./pages/EmployeeHome"; // Import EmployeeHome component
import Home from "./pages/Home";
import AddStudent from "./Students/AddStudent";
import EmployeeProducts from "./Products/EmployeeProducts";
import UpdateStudent from "./Students/UpdateStudent";

function App() {
  const [role, setRole] = useState(null); // Manage user role state

  return (
    <div className="App d-flex flex-column min-vh-100">
      <Router>
        {role === 'admin' && <Navbar />} {/* Show Navbar if role is admin */}

        <Routes>
          {/* User Selection route */}
          <Route path="/" element={<UserSelection setRole={setRole} />} />

          {/* Public routes */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/employee-login" element={<EmployeeLogin />} />
          <Route exact path="/aboutus" element={<AboutUs />} />
          <Route exact path="/contactus" element={<ContactUs />} />

          {/* Employee specific routes */}
          <Route exact path="/emp-home" element={<EmployeeHome />} /> {/* Employee home page */}
          <Route exact path="/viewsales" element={<SalesChart />} /> {/* Route for sales chart */}
          <Route exact path="/addstudent" element={<AddStudent />} />
          <Route exact path="/viewproductsemp" element={<EmployeeProducts />} />
          <Route exact path="/update-student/:id" element={<UpdateStudent />} />

          {/* Other routes for admin */}
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />
          <Route exact path="/viewproducts" element={<ViewProducts />} />
          <Route exact path="/addproduct" element={<AddProduct />} />
          <Route exact path="/editproduct/:id" element={<EditProduct />} />
          <Route exact path="/viewproduct/:id" element={<ViewProduct />} />

          {/* Redirect any undefined routes to login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
