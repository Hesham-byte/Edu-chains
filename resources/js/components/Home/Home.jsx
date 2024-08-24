import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';

const Home = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (user !== undefined) {
            setLoading(false); 
        }
    }, [user]);

    if (loading) {
        return <p>Loading...</p>;
    }
    return (
            <div>
                <h1>Welcome to Home Page </h1>
                <p>Hello, { user?.name }!</p>
                <p>Title: {user?.mobile}</p>
                {isAuthenticated ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <Link to="/login">Login</Link>
                )}
                {isAuthenticated ? (
                    <Link to="/profile">Profile</Link>
                ) : (
                    ''
                )}
            </div>
    );
};

export default Home;
