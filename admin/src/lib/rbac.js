/**
 * Frontend RBAC (Role-Based Access Control) Utility for Admin
 * Provides utilities for role-based access control in the Admin application
 */

/**
 * Get the current admin's role from localStorage
 * @returns {string} The admin's role (admin or null)
 */
export const getAdminRole = () => {
    try {
        const admin = localStorage.getItem('admin');
        if (!admin) return null;

        const adminData = JSON.parse(admin);
        return adminData.role || 'admin';
    } catch (error) {
        console.error('Error getting admin role:', error);
        return null;
    }
};

/**
 * Get the current logged-in admin data
 * @returns {object} The admin object or null
 */
export const getCurrentAdmin = () => {
    try {
        const admin = localStorage.getItem('admin');
        return admin ? JSON.parse(admin) : null;
    } catch (error) {
        console.error('Error getting current admin:', error);
        return null;
    }
};

/**
 * Check if admin is authenticated
 * @returns {boolean} True if admin is logged in
 */
export const isAdminAuthenticated = () => {
    return !!localStorage.getItem('token');
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
 * Logout admin and clear local storage
 */
export const logoutAdmin = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    localStorage.removeItem('adminId');
    // Clear any other admin-related data
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('admin_') || key.startsWith('token_')) {
            localStorage.removeItem(key);
        }
    });
};

/**
 * Check if admin has full system access
 * All authenticated admins have full access
 * @returns {boolean} True if admin is authenticated
 */
export const hasFullAccess = () => {
    return isAdminAuthenticated();
};

/**
 * Check if admin can manage users
 * @returns {boolean} True if admin can manage users
 */
export const canManageUsers = () => {
    return isAdminAuthenticated();
};

/**
 * Check if admin can manage employees
 * @returns {boolean} True if admin can manage employees
 */
export const canManageEmployees = () => {
    return isAdminAuthenticated();
};

/**
 * Check if admin can manage schemes
 * @returns {boolean} True if admin can manage schemes
 */
export const canManageSchemes = () => {
    return isAdminAuthenticated();
};

/**
 * Check if admin can manage grievances
 * @returns {boolean} True if admin can manage grievances
 */
export const canManageGrievances = () => {
    return isAdminAuthenticated();
};

/**
 * Check if admin can view announcements
 * @returns {boolean} True if admin can view announcements
 */
export const canManageAnnouncements = () => {
    return isAdminAuthenticated();
};
