import React from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import InternProfile from './InternProfile/InternProfile';
import EmployerProfile from './EmployerProfile/EmployerProfile';

const Profile = () => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Link to="/login">Login</Link>;
    }

    return (
        <div>
            {user.role === 'intern' ? <InternProfile /> : <EmployerProfile />}
        </div>
    );
};

export default Profile;
