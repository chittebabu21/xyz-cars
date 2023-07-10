import React, {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
    // declare state variables for each input field
    const [formData, setFormData] = useState({
        carMake: '',
        carModel: '',
        carPrice: '',
        yearBuilt: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // handle change in input
    const handleChange = (e) => {
        // update form data
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

        // post request using axios
        await axios.post('http://localhost:8000/cars', formData)
            .then((response) => {
                // log the response
                console.log(response);

                // send success alert
                alert('Car added successfully!');

                // clear state variables
                setError('');
                setFormData({
                    carMake: '',
                    carModel: '',
                    carPrice: '',
                    yearBuilt: ''
                });

                // navigate to home page
                navigate('/');
            })
            .catch((error) => {
                // log the error
                console.log(error);

                // set error message in state variable
                setError('Something went wrong! Please try again...');
            })
    }

    // handle cancel button
    const handleCancel = () => {
        // clear state variables
        setError('');
        setFormData({
            carMake: '',
            carModel: '',
            carPrice: '',
            yearBuilt: ''
        });

        // navigate to cars page
        navigate('/cars');
    }

    // validate form
    const validateForm = () => {
        // check if any input field is empty
        if (
            !formData.carMake.trim() ||
            !formData.carModel.trim() ||
            !formData.carPrice.trim() ||
            !formData.yearBuilt.trim()
        ) {
            // set error message in state variable
            setError('All fields are mandatory!');

            // clear form data
            setFormData({
                carMake: '',
                carModel: '',
                carPrice: '',
                yearBuilt: ''
            });

            // return false
            return false;
        }
        // clear error messages
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
            <div className="row d-flex justify-content-center">
                <form className="w-50 border border-dark rounded-3 my-5 px-5 py-3" onSubmit={handleSubmit}>
                    <div className="form-group mb-3 d-flex flex-column align-items-start">
                        <label htmlFor="carMake">Make: </label>
                        <input 
                            type="text"
                            id="carMake"
                            name="carMake"
                            className="form-control mb-3"
                            placeholder="Enter the car make..."
                            value={formData.carMake}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3 d-flex flex-column align-items-start">
                        <label htmlFor="carModel">Model: </label>
                        <input 
                            type="text"
                            id="carModel"
                            name="carModel"
                            className="form-control mb-3"
                            placeholder="Enter the car model..."
                            value={formData.carModel}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3 d-flex flex-column align-items-start">
                        <label htmlFor="carPrice">Price: </label>
                        <input 
                            type="number"
                            id="carPrice"
                            name="carPrice"
                            className="form-control mb-3"
                            placeholder="Enter the car price..."
                            value={formData.carPrice}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3 d-flex flex-column align-items-start">
                        <label htmlFor="yearBuilt">Year: </label>
                        <input 
                            type="text"
                            id="yearBuilt"
                            name="yearBuilt"
                            className="form-control mb-3"
                            placeholder="Enter the year..."
                            value={formData.yearBuilt}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="text-danger">{error}</p>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-outline-primary mx-3 my-3">ADD CAR</button>
                        <button className="btn btn-outline-secondary my-3" onClick={handleCancel}>CANCEL</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Add;