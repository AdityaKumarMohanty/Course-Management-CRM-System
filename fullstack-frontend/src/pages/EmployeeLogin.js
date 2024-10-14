import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const EmployeeLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [error, setError] = useState(''); // State for error message
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Start loading

        try {
            // Send username and password to the backend API
            const response = await axios.post('http://localhost:8080/emp-login', {
                username,
                password,
            });

            // Check if the response indicates success
            if (response.status === 200) {
                const userData = response.data; // Get user data from response

                // Store user data in localStorage (optional)
                localStorage.setItem('user', JSON.stringify(userData));
                
                // Redirect to emp-home and pass user data
                navigate('/emp-home', { state: { user: userData } });
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your username and password.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow" style={{ width: '400px' }}>
                <div className="card-body">
                    <h3 className="text-center mb-4">Employee Login</h3>
                    {error && <div className="alert alert-danger">{error}</div>} {/* Show error message */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'} {/* Show loading text */}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmployeeLogin;
