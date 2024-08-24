import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Register from '../Register/Register';
import Login from '../Login/Login';
import './LoginRegisterLayout.css';

const LoginRegisterLayout = () => {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(location.pathname === '/login');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        setIsLogin(location.pathname === '/login');
    }, [location]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
            <div className="container-fluid main-div">
                <div className="row h-100">
                    <div className="col-md-6 d-flex flex-column align-items-center left-div mt-4">
                        <img src="images/logo_pic.png" alt="Logo" className="mb-4 mt-5" style={{ width: '170px' }} />
                        <h1>Welcome to Our Community!</h1>
                        <p>Whether you are a student or a recent graduate, start your internship with us now!</p>
                    </div>
                    <div className="col-md-6 d-flex flex-column align-items-center right-div h-100">
                        <div className="w-75 mt-5">
                            <p className="h1">{isLogin ? 'Welcome back!' : 'Create your account now.'}</p>
                            <p className="h5 mb-4">{isLogin ? 'Please log in to your account.' : 'Join us to start using Educhains'}</p>
                            <div className="btn-group mb-4 w-100 border" role="group">
                                <button
                                    type="button"
                                    className={`btn ${isLogin ? 'active btn-primary' : ''}`}
                                    onClick={() => setIsLogin(true)}
                                >
                                    Login
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${!isLogin ? 'active btn-primary' : ''}`}
                                    onClick={() => setIsLogin(false)}
                                >
                                    Register
                                </button>
                            </div>
                            <div className="container">
                                {isLogin ? <Login /> : <Register />}
                            </div>
                            <div>
                                <p className='mt-3'>
                                    {isLogin ? 'Don\'t have an account? ' : 'Already have an account? '}
                                    <Link to={isLogin ? '/register' : '/login'} className='text-primary'>
                                        {isLogin ? 'Register' : 'Login'}
                                    </Link>
                                </p>
                            </div>
                            <div className="separator">
                                <span>{isLogin ? 'or Login With' : 'or Register With'}</span>
                            </div>
                            <div className="social-login container d-flex justify-content-around ">
                                <button className='btn btn-primary w-25'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook mb-1" viewBox="0 0 16 16">
                                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                                    </svg> Facebook
                                </button>
                                <button className="btn btn-danger w-25">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google mb-1" viewBox="0 0 16 16">
                                        <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
                                    </svg> Google
                                </button>
                            </div>
                        </div>
                    </div>
                    {!isMobile && <img src="images/login_pic.png" alt="Decorative" className="bottom-image" />}
                </div>
            </div>
    );
}

export default LoginRegisterLayout;
