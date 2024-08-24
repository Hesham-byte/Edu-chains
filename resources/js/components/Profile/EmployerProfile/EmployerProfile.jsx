import React, { useState } from 'react';
import { useAuth } from '../../AuthContext/AuthContext';
import { Link } from 'react-router-dom';
import axios from '../../../axios';
import Modal from '../../Modal/Modal';
import EmployerJobs from '../../Jobs/EmployerJobs'; 

const EmployerProfile = () => {
    const { user, isAuthenticated } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name || '',
        mobile: user.mobile || '',
        company_name: user.company_name || '',
        company_address: user.company_address || '',
        company_website: user.company_website || '',
        company_email: user.company_email || '',
        company_phone: user.company_phone || '',
        company_logo: user.company_logo || ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.put('/api/user/edit', formData);
            alert('Profile updated successfully');
            setIsModalOpen(false);
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error(error);
                alert('Profile update failed');
            }
        }
    };

    if (!isAuthenticated) {
        return <Link to="/login">Login</Link>;
    }

    return (
        <div>
            <h1>Employer Profile</h1>
            <p>Name: {user.name}</p>
            <p>Mobile: {user.mobile}</p>
            <p>Company Name: {user.company_name}</p>
            <p>Company Address: {user.company_address}</p>
            <p>Company Website: {user.company_website}</p>
            <p>Company Email: {user.company_email}</p>
            <p>Company Phone: {user.company_phone}</p>
            <p>Company Logo: {user.company_logo}</p>
            <button className='btn btn-primary' onClick={() => setIsModalOpen(true)}>Edit Profile</button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleFormSubmit}>
                    {['name', 'mobile', 'company_name', 'company_address', 'company_website', 'company_email', 'company_phone', 'company_logo'].map((field) => (
                        <div key={field}>
                            <label>{field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:</label>
                            <input
                                type="text"
                                name={field}
                                value={formData[field]}
                                onChange={handleInputChange}
                                required={field === 'name' || field === 'mobile'}
                            />
                            {errors[field] && <span>{errors[field][0]}</span>}
                        </div>
                    ))}
                    <button className="btn btn-primary" type="submit">Save Changes</button>
                </form>
            </Modal>
            <EmployerJobs employerId={user.employer.id} />
        </div>
    );
};

export default EmployerProfile;
