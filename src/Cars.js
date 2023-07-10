import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cars = () => {
    // declare state variables
    const [selectedOption, setSelectedOption] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // handle cancel button click event
    const handleCancel = () => {
        // clear state variables
        setSelectedOption('');
        setSearchQuery('');
        setSearchResults();

        // navigate to home page
        navigate('/');
    }

    // handle option change event
    const handleOptionChange = (e) => {
        // update state variable
        setSelectedOption(e.target.value);
    }

    // handle input change event
    const handleInputChange = (e) => {
        // update state variable
        setSearchQuery(e.target.value);
    }

    // handle submit event
    const handleSubmit = async (e) => {
        // prevent default form submission
        e.preventDefault();

        // validate form
        if (!validateForm()) {
            return;
        }

        // declare url variable
        const url = `http://localhost:8000/cars/${selectedOption}/${searchQuery}`;

        console.log(selectedOption, searchQuery, url);

        // fetch data from the backend
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong...');
                }
            })
            .then((data) => {
                setSearchResults(data);
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });

        // console log the search results
        console.log(searchResults);

        // clear state variables
        setSelectedOption('');
        setSearchQuery('');
        setError('');
    }

    // validate form
    const validateForm = () => {
        // check if option is selected
        if (selectedOption === '' || searchQuery === '') {
            setError('Please select an option and enter a search query!');
            return false
        }
        // clear error message
        setError('');

        // return true
        return true;
    }

    // navigate to add car page
    const handleAdd = () => {
        // navigate to add car page
        navigate('/add');
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
            <div className="d-flex flex-column align-items-center justify-content-center">
                <form className="w-50 border border-dark rounded-3 my-5 px-5 py-3" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <select className="form-control my-3" 
                            value={selectedOption} onChange={handleOptionChange}>
                            <option value="">Select an option</option>
                            <option value="make">Car Make</option>
                            <option value="model">Car Model</option>
                            <option value="year">Year Built</option>
                        </select>
                    </div>
                    <div className="form-group my-3" 
                        value={searchQuery} onChange={handleInputChange}>
                        <input 
                            className="form-control" 
                            type="text" 
                            placeholder="Enter search query..." 
                        />
                    </div>
                    <p className="text-danger">{error}</p>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-outline-primary my-3" type="submit">SEARCH</button>
                        <button className="btn btn-outline-success my-3" type="submit" onClick={handleAdd}>ADD CAR</button>
                        <button className="btn btn-outline-secondary my-3" type="submit" onClick={handleCancel}>CANCEL</button>
                    </div>
                </form>
                {searchResults && (
                    <div>
                        <h4 className="fs-3 text-secondary">Search Results: </h4>
                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Make</th>
                                    <th scope="col">Model</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map((result) => {
                                    return (
                                        <tr key={result.carId}>
                                            <td>{result.carId}</td>
                                            <td>{result.carMake}</td>
                                            <td>{result.carModel}</td>
                                            <td>{result.carPrice}</td>
                                            <td>{result.yearBuilt}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cars;