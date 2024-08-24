import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="py-4 mt-auto footer">
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-3 col-6">
                        <img src="/images/edu_cahins.png" alt="logo" width={100}/>
                        <p className="text-muted">Top learning experiences that create more talent in the world.</p>
                    </div>
                    <div className="col-md-3 mb-3 col-6">
                        <h5>Company</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Careers</Link></li>
                            <li><Link to="/privacy-policy">Press</Link></li>
                            <li><Link to="/terms-of-service">News</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-3 col-6">
                        <h5>Follow Us</h5>
                        <ul className="list-unstyled">
                            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-3 col-6">
                        <h5>Contact Information</h5>
                        <ul className="list-unstyled">
                            <li>Email: test@gmail.com</li>
                            <li>Phone: +123 456 7890</li>
                            <li>Address: 123 Main Street</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bd-highlight social ">
                <div className="container d-flex ">
                    <div className="me-auto bd-highlight">
                        <p className="text-muted">&copy; {new Date().getFullYear()} edu chains. All Rights Reserved.</p>
                    </div>
                    <div className="bd-highlight">
                        <a href="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;