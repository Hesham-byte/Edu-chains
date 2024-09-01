import React, { useState, useEffect } from 'react';
import axios from '../../axios';

const EmployerJobs = ({ employerId }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [newJob, setNewJob] = useState({
        employer_id: employerId,
        title: '',
        description: '',
        location: '',
        skills: '',
        salary: '',
        work_arrangement: '',
        job_type: '',
        category_id: '',
    });
    const [jobErrors, setJobErrors] = useState({});

    useEffect(() => {
        const fetchEmployerJobs = async () => {
            try {
                const response = await axios.get('/api/jobs', {
                    params: { employer_id: employerId }
                });
                setJobs(response.data.data.jobs);
            } catch (error) {
                console.error('Error fetching employer jobs:', error);
                setError('Failed to fetch jobs');
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data.data.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchEmployerJobs();
        fetchCategories();
    }, [employerId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewJob((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleJobSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/jobs', {
                ...newJob,
                employer_id: employerId,
            });
            setJobs((prevJobs) => [...prevJobs, response.data.data.job]);
            setNewJob({
                employer_id: employerId,
                title: '',
                description: '',
                location: '',
                skills: '',
                salary: '',
                work_arrangement: '',
                job_type: '',
                category_id: '',
            });
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setJobErrors(error.response.data.errors);
            } else {
                console.error('Error adding job:', error);
            }
        }
    };

    if (loading) return <p>Loading jobs...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Your Jobs</h2>
            <form onSubmit={handleJobSubmit}>
                <input
                    type="text"
                    name="title"
                    value={newJob.title}
                    onChange={handleInputChange}
                    placeholder="Job Title"
                />
                {jobErrors.title && <span>{jobErrors.title[0]}</span>}

                <textarea
                    name="description"
                    value={newJob.description}
                    onChange={handleInputChange}
                    placeholder="Job Description"
                />
                {jobErrors.description && <span>{jobErrors.description[0]}</span>}

                <input
                    type="text"
                    name="location"
                    value={newJob.location}
                    onChange={handleInputChange}
                    placeholder="Job Location"
                />
                {jobErrors.location && <span>{jobErrors.location[0]}</span>}

                <input
                    type="text"
                    name="skills"
                    value={newJob.skills}
                    onChange={handleInputChange}
                    placeholder="Required Skills"
                />
                {jobErrors.skills && <span>{jobErrors.skills[0]}</span>}

                <input
                    type="number"
                    name="salary"
                    value={newJob.salary}
                    onChange={handleInputChange}
                    placeholder="Salary"
                />
                {jobErrors.salary && <span>{jobErrors.salary[0]}</span>}

                <select
                    name="work_arrangement"
                    value={newJob.work_arrangement}
                    onChange={handleInputChange}
                >
                    <option value="">Select Work Arrangement</option>
                    <option value="remote">Remote</option>
                    <option value="onsite">Onsite</option>
                    <option value="hybrid">Hybrid</option>
                </select>
                {jobErrors.work_arrangement && <span>{jobErrors.work_arrangement[0]}</span>}

                <select
                    name="job_type"
                    value={newJob.job_type}
                    onChange={handleInputChange}
                >
                    <option value="">Select Job Type</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                </select>
                {jobErrors.job_type && <span>{jobErrors.job_type[0]}</span>}

                <select
                    name="category_id"
                    value={newJob.category_id}
                    onChange={handleInputChange}
                >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {jobErrors.category_id && <span>{jobErrors.category_id[0]}</span>}

                <button type="submit">Add Job</button>
            </form>

            {jobs.length === 0 ? (
                <p>No jobs found.</p>
            ) : (
                <ul>
                    {jobs.map((job) => (
                        <li key={job.id}>
                            <h3>{job.title}</h3>
                            <p>{job.description}</p>
                            <p>Location: {job.location}</p>
                            <p>Skills: {job.skills}</p>
                            <p>Salary: ${job.salary} {job.currency}</p>
                            <p>Work Arrangement: {job.work_arrangement}</p>
                            <p>Job Type: {job.job_type}</p>
                            <p>Category: {categories.find(cat => cat.id === job.category_id)?.name}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EmployerJobs;
