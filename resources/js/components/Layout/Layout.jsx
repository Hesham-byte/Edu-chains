import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();
    const hideFooterRoutes = ['/login', '/register'];
    const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

    return (
        <>
            <Navbar />
            {children}
            {!shouldHideFooter && <Footer />}
        </>
    );
}

export default Layout;
