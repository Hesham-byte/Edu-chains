import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchUser = async () => {
            try {
                if (token) {
                    const response = await axios.get('/api/user', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log(response.data.data.user);
                    setUser(response.data.data.user);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();

        const updateUserOnLogin = () => fetchUser();
        const updateUserOnLogout = () => {
            setUser(null);
            setIsAuthenticated(false);
        };

        document.addEventListener('login', updateUserOnLogin);
        document.addEventListener('logout', updateUserOnLogout);

        return () => {
            document.removeEventListener('login', updateUserOnLogin);
            document.removeEventListener('logout', updateUserOnLogout);
        };
    }, []);

    const login = async (email, password, remember) => {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.post('/api/login', { email, password, remember },
        );
        localStorage.setItem('token', response.data.data.token);
        setIsAuthenticated(true);
        setUser(response.data.user);
        document.dispatchEvent(new Event('login'));
    };

    const logout = async () => {
        await axios.post('/api/logout', {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
        document.dispatchEvent(new Event('logout'));
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};
