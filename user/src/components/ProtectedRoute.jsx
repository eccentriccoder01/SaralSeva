import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasRole, isAuthenticated } from '../lib/rbac';

/**
 * ProtectedRoute Component
 * Restricts access to routes based on user role
 * 
 * @param {object} props - Component props
 * @param {React.Component} props.element - Component to render if authorized
 * @param {string|array} props.requiredRoles - Required role(s) to access
 * @param {string} props.fallbackRoute - Route to redirect to if unauthorized (default: '/login')
 * @returns {React.Component} Protected route component
 */
const ProtectedRoute = ({ element, requiredRoles, fallbackRoute = '/login' }) => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
        return <Navigate to={fallbackRoute} replace />;
    }

    // Check if user has required role
    if (!hasRole(requiredRoles)) {
        return (
            <Navigate
                to="/unauthorized"
                replace
                state={{
                    message: 'You do not have permission to access this page.'
                }}
            />
        );
    }

    // User is authorized, render the component
    return element;
};

export default ProtectedRoute;
