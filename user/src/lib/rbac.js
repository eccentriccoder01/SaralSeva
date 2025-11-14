/**
 * Frontend RBAC (Role-Based Access Control) Utility
 * Provides utilities for role-based access control in the User application
 */

/**
 * Get the current user's role from localStorage
 * @returns {string} The user's role (user, employee, admin, or null)
 */
export const getUserRole = () => {
    try {
        const user = localStorage.getItem('user');
        if (!user) return null;

        const userData = JSON.parse(user);
        return userData.role || null;
    } catch (error) {
        console.error('Error getting user role:', error);
        return null;
    }
};

/**
 * Get the current logged-in user data
 * @returns {object} The user object or null
 */
export const getCurrentUser = () => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
};

/**
 * Check if user has required role
 * @param {string|array} requiredRoles - Single role or array of allowed roles
 * @returns {boolean} True if user has the required role
 */
export const hasRole = (requiredRoles) => {
    const userRole = getUserRole();
    if (!userRole) return false;

    const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
    return rolesArray.includes(userRole);
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is logged in
 */
export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

/**
 * Check if user is an admin
 * @returns {boolean} True if user is admin
 */
export const isAdmin = () => {
    return hasRole('admin');
};

/**
 * Check if user is an employee
 * @returns {boolean} True if user is employee
 */
export const isEmployee = () => {
    return hasRole('employee');
};

/**
 * Check if user is a regular user
 * @returns {boolean} True if user is regular user
 */
export const isUser = () => {
    return hasRole('user');
};

/**
 * Get authorization header for API requests
 * @returns {object} Object with Authorization header
 */
export const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token
        ? { Authorization: `Bearer ${token}` }
        : {};
};

/**
 * Check if user can access a resource based on role
 * @param {string|array} allowedRoles - Roles that can access
 * @returns {boolean} True if user can access
 */
export const canAccess = (allowedRoles) => {
    return isAuthenticated() && hasRole(allowedRoles);
};

/**
 * Logout user and clear local storage
 */
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    // Clear any other user-related data
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('user_') || key.startsWith('token_')) {
            localStorage.removeItem(key);
        }
    });
};
