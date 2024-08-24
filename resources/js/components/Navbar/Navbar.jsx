import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("/api/categories")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    },[]);

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 d-flex justify-content-between align-items-center">
                        <li className="nav-item">
                            <Link className="navbar-brand" to="/">
                                <img src="/images/logo.png" alt="logo" width={160}/>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">
                                About us
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Internships
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        <Link className="dropdown-item" to={`/jobs/category/${category.id}`}>
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact-us">
                                Contact us
                            </Link>
                        </li>
                        {isAuthenticated ? (
                            <>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle d-flex align-items-center"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img className="rounded-circle" src={`${user.image}`} width={50} alt="user" />
                                </a>
                                
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li >
                                        <Link to="/profile" className="dropdown-item">
                                            My profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={logout}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <div className="d-flex">
                                        <Link className="nav-link mt-1" to="/login">
                                            Login
                                        </Link>
                                        <Link className="nav-link" to="/register">
                                            <span className="btn create-btn">
                                                Create new account
                                            </span>
                                        </Link>
                                    </div>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>


    );
};

export default Navbar;
