import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap"; // Import Bootstrap components
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to get the student ID
import EmployeeNavbar from '../layout/EmpNavbar'; // Import the Employee Navbar component

const UpdateStudent = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [noOfCalls, setNoOfCalls] = useState(0);
    const [status, setStatus] = useState('not enrolled'); // Default status
    const [interestedCourses, setInterestedCourses] = useState([]); // Courses fetched from API
    const [selectedCourse, setSelectedCourse] = useState(''); // Selected course
    const { id } = useParams(); // Get the student ID from the URL
    const navigate = useNavigate();
    const [employeeId, setEmployeeId] = useState(null); // Store logged-in employee ID

    useEffect(() => {
        // Fetch logged-in employee/user details
        const storedUser = JSON.parse(localStorage.getItem('user')); // Assuming user data is stored in localStorage
        if (storedUser && storedUser.id) {
            setEmployeeId(storedUser.id); // Set the employee ID from the stored user data
        }

        // Fetch the existing student data
        const fetchStudent = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/student/${id}`);
                const student = response.data;
                setName(student.name);
                setPhoneNumber(student.phoneNumber);
                setEmail(student.email);
                setNoOfCalls(student.noOfCalls);
                setStatus(student.status);
                setSelectedCourse(student.intrestedCourse); // Assuming "intrestedCourse" field exists
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        // Fetch products to get interested courses
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/products'); // Adjust the endpoint as necessary
                setInterestedCourses(response.data); // Assuming response is an array of course names
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchStudent();
        fetchCourses();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const updatedStudent = {
            name,
            phoneNumber,
            email,
            noOfCalls,
            status,
            intrestedCourse: selectedCourse, // Store selected course
        };

        try {
            // Send the employee ID in the path of the PUT request URL
            await axios.put(`http://localhost:8080/student/${id}/employee/${employeeId}`, updatedStudent); // Include employeeId in the URL
            navigate("/emp-home");
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    return (
        <div>
            <EmployeeNavbar /> {/* Add the Employee Navbar at the top */}
            <div className="container mt-4">
                <h2>Update Student</h2>
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
                            <option value="not interested">Not Interested</option>
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

                    <Button variant="primary" type="submit">Update Student</Button>
                </Form>
            </div>
        </div>
    );
};

export default UpdateStudent;
