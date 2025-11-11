import React from 'react';
import { Navigate } from 'react-router-dom';
import { isEmployeeAuthenticated } from '../lib/rbac';

/**
 * EmployeeProtectedRoute Component
 * Restricts access to routes based on employee authentication
 * 
 * @param {object} props - Component props
 * @param {React.Component} props.element - Component to render if authorized
 * @param {string} props.fallbackRoute - Route to redirect to if unauthorized (default: '/login')
 * @returns {React.Component} Protected route component
 */
const EmployeeProtectedRoute = ({ element, fallbackRoute = '/login' }) => {
    // Check if employee is authenticated
    if (!isEmployeeAuthenticated()) {
        return <Navigate to={fallbackRoute} replace />;
    }

    // Employee is authenticated, render the component
    return element;
};

export default EmployeeProtectedRoute;
