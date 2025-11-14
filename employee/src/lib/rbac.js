/**
 * Frontend RBAC (Role-Based Access Control) Utility for Employee
 * Provides utilities for role-based access control in the Employee application
 */

/**
 * Get the current employee's role from localStorage
 * @returns {string} The employee's role (employee or null)
 */
export const getEmployeeRole = () => {
    try {
        const employee = localStorage.getItem('employee');
        if (!employee) return null;

        const employeeData = JSON.parse(employee);
        return employeeData.role || 'employee';
    } catch (error) {
        console.error('Error getting employee role:', error);
        return null;
    }
};

/**
 * Get the current logged-in employee data
 * @returns {object} The employee object or null
 */
export const getCurrentEmployee = () => {
    try {
        const employee = localStorage.getItem('employee');
        return employee ? JSON.parse(employee) : null;
    } catch (error) {
        console.error('Error getting current employee:', error);
        return null;
    }
};

/**
 * Check if employee is authenticated
 * @returns {boolean} True if employee is logged in
 */
export const isEmployeeAuthenticated = () => {
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
 * Logout employee and clear local storage
 */
export const logoutEmployee = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('employee');
    localStorage.removeItem('empId');
    // Clear any other employee-related data
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('employee_') || key.startsWith('token_')) {
            localStorage.removeItem(key);
        }
    });
};

/**
 * Check if current user can perform admin actions
 * Employees can only view their own data and grievances assigned to them
 * @returns {boolean} False - employees cannot perform admin actions
 */
export const canPerformAdminActions = () => {
    return false;
};

/**
 * Get employee grievances they are assigned to
 * @returns {array} Array of grievance IDs
 */
export const getAssignedGrievances = () => {
    try {
        const employee = getCurrentEmployee();
        return employee?.assignedGrievances || [];
    } catch (error) {
        console.error('Error getting assigned grievances:', error);
        return [];
    }
};

/**
 * Get employee schemes they are assigned to
 * @returns {array} Array of scheme IDs
 */
export const getAssignedSchemes = () => {
    try {
        const employee = getCurrentEmployee();
        return employee?.assignedSchemes || [];
    } catch (error) {
        console.error('Error getting assigned schemes:', error);
        return [];
    }
};
