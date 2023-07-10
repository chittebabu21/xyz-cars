import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    // declare state variables for each input field
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        userPassword: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // handle change in input
    const handleChange = (e) => {
        // update state variable
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    // handle form submission
    const handleSubmit = async (e) => {
        // prevent default form action
        e.preventDefault();

        // validate form
        if (!validateForm()) {
            return;
        }

        // check if password and confirm password match
        if (formData.userPassword !== formData.confirmPassword) {
            // set error message in state variable
            setError('Passwords do not match!');

            // clear form data
            setFormData({
                userName: '',
                userEmail: '',
                userPassword: '',
                confirmPassword: ''
            });

            // return statement
            return;
        }
        
        // post request using axios
        await axios.post('http://localhost:8000/users', formData)
            .then((response) => {
                // log the response
                console.log(response);

                // send success alert
                alert('User registered successfully!');

                // clear state variables
                setError('');

                // clear form data
                setFormData({
                    userName: '',
                    userEmail: '',
                    userPassword: '',
                    confirmPassword: ''
                });

                // redirect to home page
                navigate('/');
            })
            .catch((error) => {
                // set error message in state variable
                setError('Something went wrong! Please try again later.');

                // log the error
                console.error(error);
            })
    }

    // handle cancel button click
    const handleCancel = () => {
        // clear state variables
        setError('');
        setFormData({
            userName: '',
            userEmail: '',
            userPassword: '',
            confirmPassword: ''
        });

        // redirect to home page
        navigate('/');
    }

    // validate form method
    const validateForm = () => {
        // check if any input field is empty
        if (!formData.userName || !formData.userEmail || !formData.userPassword) {
            // error message
            setError('All fields are mandatory!');

            // clear form data
            setFormData({
                userName: '',
                userEmail: '',
                userPassword: '',
                confirmPassword: ''
            });

            // return false
            return false;
        }
        // clear error message
        setError('');

        // return true
        return true;
    }

    return (
        <div className="container h-100 mt-3">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ms-auto">
                <div className="container">
                    <Link className="navbar-brand text-light mx-4" to="/">XYZ CARS</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-light mx-4" to="/cars">CARS</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light mx-4" to="/login">LOGIN</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light mx-4" to="/register">REGISTER</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="d-flex justify-content-center">
                <form className="w-50 border border-dark rounded-3 my-5 px-5 py-3" onSubmit={handleSubmit}>
                    <div className="form-group mb-3 d-flex flex-column align-items-start">
                        <label htmlFor="userName">Name: </label>
                        <input 
                            type="text"
                            id="userName"
                            name="userName"
                            className="form-control mb-3"
                            placeholder="Enter your name..."
                            value={formData.userName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3 d-flex flex-column align-items-start">
                        <label htmlFor="userEmail">Email: </label>
                        <input 
                            type="email"
                            id="userEmail"
                            name="userEmail"
                            className="form-control mb-3"
                            placeholder="Enter your email..."
                            value={formData.userEmail}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3 d-flex flex-column align-items-start">
                        <label htmlFor="userPassword">Password: </label>
                        <input 
                            type="password"
                            id="userPassword"
                            name="userPassword"
                            className="form-control mb-3"
                            placeholder="Enter your password..."
                            value={formData.userPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="confirmPassword">Name: </label>
                        <input 
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-control mb-3"
                            placeholder="Confirm your password..."
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="text-danger">{error}</p>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-outline-primary mx-3 my-3">REGISTER</button>
                        <button className="btn btn-outline-secondary my-3" onClick={handleCancel}>CANCEL</button>
                    </div>
                </form>
            </div>
        </div>
    ); 
}

export default Register;