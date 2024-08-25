import React, { useState } from 'react';
import axios from '../../axios';
import { useAuth } from '../AuthContext/AuthContext';
import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [role, setRole] = useState('intern');
    const [mobile, setMobile] = useState('');
    const [errors, setErrors] = useState({});
    const { login } = useAuth();


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
                role,
                mobile
            };

            await axios.post('/api/register', formData);
            await login(email, password, false);
            window.location = '/';
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error(error);
                alert('Registration failed');
            }
        }
    };

    return (
        <>
            <form onSubmit={handleRegister} className="register-form">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className='form-control p-2'
                    />
                    {errors.name && <span className="error-text">{errors.name[0]}</span>}
                </div>
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
                <div className="form-group">
                    <input
                        type="password"
                        placeholder='Confirm Password'
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                        className='form-control p-2'
                    />
                    {errors.password_confirmation && <span className="error-text">{errors.password_confirmation[0]}</span>}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder='Mobile'
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                        className='form-control p-2'
                    />
                    {errors.mobile && <span className="error-text">{errors.mobile[0]}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="role" className='mb-1'>Choose your role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        className='form-control p-2'
                    >
                        <option value="intern">Intern</option>
                        <option value="employer">Employer</option>
                    </select>
                </div>
                <button className='btn btn-primary w-100 mt-3' type="submit">Register</button>
            </form>
        </>
    );
};

export default Register;
