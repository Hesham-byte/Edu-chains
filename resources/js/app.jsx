import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Title from './components/Title/Title';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import JobList from './components/Jobs/JobList';
import LoginRegisterLayout from './components/LoginRegisterLayout/LoginRegisterLayout';
import { AuthProvider, useAuth } from './components/AuthContext/AuthContext';
import ContactUs from './components/ContactUs/ContactUs';
import JobCategory from './components/JobCategory/JobCategory';
import Layout from './components/Layout/Layout';

const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated ? children : <Navigate to="/" />;
};

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route
                        path="/contact-us"
                        element={
                            <Layout>
                                <Title title="Contact Us" />
                                <ContactUs />
                            </Layout>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <PublicRoute>
                                <Layout>
                                    <Title title="Register" />
                                    <LoginRegisterLayout />
                                </Layout>
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Layout>
                                    <Title title="Login" />
                                    <LoginRegisterLayout />
                                </Layout>
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Title title="Profile" />
                                    <Profile />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/jobs"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Title title="Jobs" />
                                    <JobList />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <Title title="Home" />
                                <Home />
                            </Layout>
                        }
                    />
                    <Route
                        path="/jobs/category/:id"
                        element={
                            <Layout>
                                <Title title="Job Category" />
                                <JobCategory />
                            </Layout>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
