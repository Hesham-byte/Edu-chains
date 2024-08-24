import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password, remember);
            window.location = '/';
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error(error);
                alert('Login failed');
            }
        }
    };

    return (
        <>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='form-control p-2'
                    />
                    {errors.email && <span className="error-text">{errors.email[0]}</span>}
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='form-control p-2'
                    />
                    {errors.password && <span className="error-text">{errors.password[0]}</span>}
                </div>
                <button className='btn btn-primary w-100 mt-3' type="submit">Login</button>
            </form>
        </>
    );
};

export default Login;
