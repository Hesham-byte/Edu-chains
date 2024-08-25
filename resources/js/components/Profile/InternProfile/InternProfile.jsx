import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext/AuthContext';
import { Link } from 'react-router-dom';
import axios from '../../../axios';
import Modal from '../../Modal/Modal';

const Profile = () => {
    const { user, isAuthenticated } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name || '',
        title: user.title || '',
        mobile: user.mobile || '',
        cv: user.cv || '',
        description: user.description || '',
        tags: []
    });
    const [errors, setErrors] = useState({});
    const [tagSuggestions, setTagSuggestions] = useState([]);
    const [tagInput, setTagInput] = useState('');
    // console.log(user);
    useEffect(() => {
        if (tagInput) {
            const fetchTagSuggestions = async () => {
                try {
                    const response = await axios.get(`/api/tags?q=${tagInput}`);
                    setTagSuggestions(response.data);
                } catch (error) {
                    console.error('Error fetching tag suggestions:', error);
                    setTagSuggestions([]);
                }
            };

        }
    }, [tagInput]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleTagInputChange = async (e) => {
        const inputValue = e.target.value;
        setTagInput(inputValue);

        try {
            const response = await axios.get(`/api/tags?q=${inputValue}`);
            const existingTags = user.tags.map(tag => tag.name.en);
            const allSuggestions = [...response.data, inputValue];
            const newSuggestions = allSuggestions.filter(tag => !existingTags.includes(tag));
            setTagSuggestions(newSuggestions);
        } catch (error) {
            console.error('Error fetching tag suggestions:', error);
            setTagSuggestions([]);
        }
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const existingTags = user.tags.map(tag => tag.name.en);

        const newTags = formData.tags.filter(tag => !existingTags.includes(tag));
        for (const tag of newTags) {
            try {
                await axios.post('/api/tags', { name: tag });
            } catch (error) {
                if (error.response && error.response.status !== 422) {
                    console.error('Error adding new tag:', error);
                    alert('Failed to add new tag');
                }
            }
        }

        const updatedTags = [...existingTags, ...newTags];

        try {
            await axios.put('/api/user/edit', { ...formData, tags: updatedTags });
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

    const handleTagSelection = (tag) => {
        if (!formData.tags.includes(tag)) {
            setFormData((prevData) => ({
                ...prevData,
                tags: [...prevData.tags, tag]
            }));
        }
        setTagInput('');
        setTagSuggestions([]);
    };


    if (!isAuthenticated) {
        return <Link to="/login">Login</Link>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>Name: {user.name}</p>
            <p>Title: {user.title}</p>
            <p>Mobile: {user.mobile}</p>
            <p>CV: {user.cv}</p>
            <p>Description: {user.description}</p>
            <p>Tags: {user.tags && user.tags.map(tag => tag.name.en).join(' ')}</p>
            <p>image: {user.image}</p>
            <button className='btn btn-primary' onClick={() => setIsModalOpen(true)}>Edit Profile</button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleFormSubmit}>
                    {['name', 'title', 'mobile', 'cv', 'description'].map((field) => (
                        <div key={field}>
                            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
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
                    <div>
                        <label>Tags:</label>
                        <input
                            type="text"
                            name="tagInput"
                            value={tagInput}
                            onChange={handleTagInputChange}
                            autoComplete="off"
                        />
                        {tagSuggestions.length > 0 && (
                            <ul>
                            {tagSuggestions.map((tag, index) => (
                                <li key={`${tag}-${index}`} onClick={() => handleTagSelection(tag)}>{tag}</li>
                            ))}
                        </ul>
                        )}
                        {formData.tags.length > 0 && (
                            <div>
                                {formData.tags.map((tag, index) => (
                                    <span key={index} className="tag">{tag}</span>
                                ))}
                            </div>
                        )}
                        {errors.tags && <span>{errors.tags[0]}</span>}
                    </div>
                    <button className="btn btn-primary" type="submit">Save Changes</button>
                </form>
            </Modal>
        </div>
    );
};

export default Profile;
