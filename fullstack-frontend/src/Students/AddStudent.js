import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap"; // Import Bootstrap components
import { useNavigate } from "react-router-dom";
import EmployeeNavbar from '../layout/EmpNavbar'; // Import the Employee Navbar component

const AddStudent = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [noOfCalls, setNoOfCalls] = useState(0);
    const [status, setStatus] = useState('not enrolled'); // Default status
    const [interestedCourses, setInterestedCourses] = useState([]); // Courses fetched from API
    const [selectedCourse, setSelectedCourse] = useState(''); // Selected course
    const [employeeId, setEmployeeId] = useState(null); // Store logged-in employee ID

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch logged-in employee/user details
        const storedUser = JSON.parse(localStorage.getItem('user')); // Assuming user data is stored in localStorage
        if (storedUser && storedUser.id) {
            setEmployeeId(storedUser.id); // Set the employee ID from the stored user data
        }

        // Fetch products to get interested courses
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/products'); // Adjust the endpoint as necessary
                setInterestedCourses(response.data); // Assuming response is an array of course names
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const newStudent = {
            name,
            phoneNumber,
            email,
            noOfCalls,
            status,
            intrestedCourse: selectedCourse, // Store selected course
        };

        try {
            // Send the employee ID in the path of the POST request URL
            await axios.post(`http://localhost:8080/student/${employeeId}`, newStudent); // Include employeeId in the URL
            navigate("/emp-home"); // Redirect after submission
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    return (
        <div>
            <EmployeeNavbar /> {/* Add the Employee Navbar at the top */}
            <div className="container mt-4">
                <h2>Add New Student</h2>
                <Form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formNoOfCalls">
                        <Form.Label>No. of Calls</Form.Label>
                        <Form.Control
                            type="number"
                            value={noOfCalls}
                            onChange={(e) => setNoOfCalls(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="enrolled">Enrolled</option>
                            <option value="not enrolled">Not Enrolled</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formInterestedCourses">
                        <Form.Label>Interested Course</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            <option value="">Select a course</option>
                            {interestedCourses.map((course) => (
                                <option key={course.id} value={course.name}>
                                    {course.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">Add Student</Button>
                </Form>
            </div>
        </div>
    );
};

export default AddStudent;
