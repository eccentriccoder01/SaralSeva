import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import adminModel from '../models/adminModel.js';
import employeeModel from '../models/EmployeesModel.js';

/**
 * Middleware to verify JWT token and extract user information
 * Sets req.user with decoded token data
 */
export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided. Authentication required.',
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
        });
    }
};

/**
 * Higher-order function to create role-based access control middleware
 * @param {string|array} allowedRoles - Single role or array of allowed roles
 * @returns {function} Middleware function
 */
export const checkRole = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            // Ensure verifyToken has been called
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not authenticated',
                });
            }

            const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

            // Check if user's role is in the allowed roles
            if (!rolesArray.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: `Access denied. Required roles: ${rolesArray.join(', ')}`,
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error checking role permissions',
                error: error.message,
            });
        }
    };
};

/**
 * Combined middleware: Verify token and check role
 * @param {string|array} allowedRoles - Single role or array of allowed roles
 * @returns {array} Array of middleware functions
 */
export const requireRole = (allowedRoles) => {
    return [verifyToken, checkRole(allowedRoles)];
};

/**
 * Middleware to check if user is authenticated (any role)
 */
export const requireAuth = [verifyToken];

/**
 * Middleware to check if user is admin
 */
export const requireAdmin = [verifyToken, checkRole('admin')];

/**
 * Middleware to check if user is employee
 */
export const requireEmployee = [verifyToken, checkRole('employee')];

/**
 * Middleware to check if user is regular user
 */
export const requireUser = [verifyToken, checkRole('user')];

/**
 * Middleware to allow multiple roles
 * @param {array} roles - Array of allowed roles
 * @returns {array} Array of middleware functions
 */
export const requireAnyRole = (roles) => {
    return [verifyToken, checkRole(roles)];
};
