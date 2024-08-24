import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobCategory = () => {
    const { id } = useParams(); 
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`/api/jobs/category/${id}`);
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs by category:', error);
            }
        };

        if (id) { 
            fetchJobs();
        }
    }, [id]);

    return (
        <div>
            <h1>Jobs in Category {id}</h1>
            {jobs.length > 0 ? (
                <ul>
                    {jobs.map(job => (
                        <li key={job.id}>{job.title}</li>
                    ))}
                </ul>
            ) : (
                <p>No jobs found in this category.</p>
            )}
        </div>
    );
};

export default JobCategory;
