import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import EmployeeNavbar from '../layout/EmpNavbar';

const EmployeeHome = () => {
    const [students, setStudents] = useState([]);
    const [user, setUser] = useState(null); // State for user details
    const [employeeSales, setEmployeeSales] = useState(0); // State for employee's sales
    const [companySales, setCompanySales] = useState(0); // State for company's total sales this month
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/students');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        const fetchSalesData = async (userId) => {
            try {
                // Fetch employee's sales
                const employeeSalesResponse = await axios.get(`http://localhost:8080/employee/${userId}`);
                setEmployeeSales(employeeSalesResponse.data.total_sales || 0);

                // Fetch company's total sales for the current month
                const companySalesResponse = await axios.get('http://localhost:8080/company/current-month');
                setCompanySales(companySalesResponse.data.total_sales || 0);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        // Fetch user details from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUser(user);

            // Fetch sales data for the logged-in user
            fetchSalesData(user.id);
        }

        fetchStudents();
    }, []);

    // Get current students for the current page
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/student/${id}`);
            setStudents(students.filter((student) => student.id !== id));
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="container-fluid mt-4">
            <EmployeeNavbar />

            {/* Welcome message with sales data */}
            {user && (
                <div>
                    <h3
                        className="mb-4"
                        style={{ cursor: 'pointer', color: 'blue' }}
                        onClick={() => setShowModal(true)}
                    >
                        Welcome, {user.name}!
                    </h3>
                    <p>
                        <strong>Your sales this month:</strong> ₹{employeeSales.toFixed(2)}
                    </p>
                    <p>
                        <strong>Company's total sales this month:</strong> ₹{companySales.toFixed(2)}
                    </p>
                </div>
            )}

            <h2 className="mb-4">Student List</h2>
            <div className="py-4">
                <table className="table table-striped border shadow">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Interested Course</th>
                            <th>No. of Calls</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.phoneNumber}</td>
                                <td>{student.email}</td>
                                <td>{student.intrestedCourse}</td>
                                <td>{student.noOfCalls}</td>
                                <td>{student.status}</td>
                                <td>
                                    {student.status === 'enrolled' ? (
                                        <span style={{ color: 'green' }}>Success</span>
                                    ) : student.status === 'not enrolled' ? (
                                        <Link to={`/update-student/${student.id}`} className="btn btn-warning btn-sm">
                                            Update
                                        </Link>
                                    ) : student.status === 'not interested' ? (
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(student.id)}
                                        >
                                            Delete
                                        </Button>
                                    ) : null}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <nav>
                    <ul className="pagination justify-content-center">
                        {Array.from({ length: Math.ceil(students.length / studentsPerPage) }, (_, index) => (
                            <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                                <button onClick={() => paginate(index + 1)} className="page-link">
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Logout Button */}
            <button
                className="btn btn-danger position-fixed bottom-0 end-0 m-3"
                style={{ zIndex: 1000 }}
                onClick={handleLogout}
            >
                Logout
            </button>

            {/* Modal for displaying user details */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {user ? (
                        <div>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                        </div>
                    ) : (
                        <p>No user details available.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EmployeeHome;
