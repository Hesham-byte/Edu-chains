import React, { useEffect, useState } from 'react';
import axios from '../../axios';

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('/api/jobs');
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    console.log(jobs);
    return (
        <div>
            <h2>Job List</h2>
            <ul>
                {jobs.map((job) => (
                    <li key={job.id}>
                        <h3>{job.title}</h3>
                        <p>{job.description}</p>
                        <p>Location: {job.location}</p>
                        {job.salary && <p>Salary: ${job.salary}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobList;
