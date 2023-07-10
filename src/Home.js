import React from "react";
import { Link } from "react-router-dom";
import Image from "./assets/maserati.jpg";

const Home = () => {
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
                        <span className="navbar-toggler-icon text-light"></span>
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
            <img className="img-fluid my-5" width="800" alt="maserati car" src={Image}/>
        </div>
    );
}

export default Home;