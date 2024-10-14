// UserSelection.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserSelection.css';

const UserSelection = ({ setRole }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility

    const handleLoginClick = () => {
        setShowModal(true); // Show the modal
    };

    const handleRoleSelect = (role) => {
        setRole(role); // Set the role in App.js
        setShowModal(false); // Close the modal
        if (role === 'admin') {
            navigate('/login'); // Redirect to admin login
        } else {
            navigate('/employee-login'); // Redirect to employee login
        }
    };

    return (
        <div className="user-selection-container">
            <h2 className="welcome-text">Welcome to the CRM System</h2>
            <p className="description-text">This system is designed for efficient course management.</p>
            <button className="btn btn-primary login-button" onClick={handleLoginClick}>Login</button>

            {/* Modal for role selection */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Select Your Role</h3>
                        <button className="btn btn-primary" onClick={() => handleRoleSelect('admin')}>Admin</button>
                        <button className="btn btn-secondary" onClick={() => handleRoleSelect('employee')}>Employee</button>
                        <button className="btn btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserSelection;
