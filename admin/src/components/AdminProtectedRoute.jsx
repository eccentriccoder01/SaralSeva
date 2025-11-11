import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminAuthenticated } from '../lib/rbac';

/**
 * AdminProtectedRoute Component
 * Restricts access to routes based on admin authentication
 * Only authenticated admins can access the routes
 * 
 * @param {object} props - Component props
 * @param {React.Component} props.element - Component to render if authorized
 * @param {string} props.fallbackRoute - Route to redirect to if unauthorized (default: '/login')
 * @returns {React.Component} Protected route component
 */
const AdminProtectedRoute = ({ element, fallbackRoute = '/login' }) => {
    // Check if admin is authenticated
    if (!isAdminAuthenticated()) {
        return <Navigate to={fallbackRoute} replace />;
    }

    // Admin is authenticated, render the component
    return element;
};

export default AdminProtectedRoute;
