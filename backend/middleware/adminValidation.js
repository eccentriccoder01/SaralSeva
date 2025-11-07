import mongoose from 'mongoose';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mobile validation regex (10 digits)
const mobileRegex = /^[0-9]{10}$/;

// Password validation (min 8 chars, at least 1 uppercase, 1 lowercase, 1 number)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Admin ID validation (alphanumeric, 5-20 chars)
const adminIdRegex = /^[a-zA-Z0-9]{5,20}$/;

/**
 * Validates admin registration input
 */
export const validateAdminRegistration = (req, res, next) => {
    const { name, email, mobile, password, adminId, gender } = req.body;
    const errors = [];

    // Name validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        errors.push('Name is required and must be a non-empty string');
    } else if (name.trim().length < 2 || name.trim().length > 100) {
        errors.push('Name must be between 2 and 100 characters');
    }

    // Email validation
    if (!email || typeof email !== 'string') {
        errors.push('Email is required and must be a string');
    } else if (!emailRegex.test(email.trim())) {
        errors.push('Invalid email format');
    }

    // Mobile validation
    if (!mobile || typeof mobile !== 'string') {
        errors.push('Mobile number is required and must be a string');
    } else if (!mobileRegex.test(mobile.trim())) {
        errors.push('Mobile number must be exactly 10 digits');
    }

    // Password validation
    if (!password || typeof password !== 'string') {
        errors.push('Password is required and must be a string');
    } else if (!passwordRegex.test(password)) {
        errors.push('Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number');
    }

    // Admin ID validation
    if (!adminId || typeof adminId !== 'string') {
        errors.push('Admin ID is required and must be a string');
    } else if (!adminIdRegex.test(adminId.trim())) {
        errors.push('Admin ID must be alphanumeric and between 5-20 characters');
    }

    // Gender validation
    if (!gender || typeof gender !== 'string') {
        errors.push('Gender is required and must be a string');
    } else if (!['male', 'female', 'other'].includes(gender.toLowerCase())) {
        errors.push('Gender must be one of: male, female, other');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};

/**
 * Validates admin login input
 */
export const validateAdminLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];

    // Email validation
    if (!email || typeof email !== 'string') {
        errors.push('Email is required and must be a string');
    } else if (!emailRegex.test(email.trim())) {
        errors.push('Invalid email format');
    }

    // Password validation
    if (!password || typeof password !== 'string') {
        errors.push('Password is required and must be a string');
    } else if (password.length === 0) {
        errors.push('Password cannot be empty');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};

/**
 * Validates MongoDB ObjectId
 */
export const validateObjectId = (req, res, next) => {
    const id = req.params.id || req.body.id;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID is required'
        });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID format'
        });
    }

    next();
};

/**
 * Validates admin change status input
 */
export const validateAdminChangeStatus = (req, res, next) => {
    const { adminId, final_status, scheme_applied_id, id, password } = req.body;
    const errors = [];

    // Admin ID validation
    if (!adminId || typeof adminId !== 'string') {
        errors.push('Admin ID is required and must be a string');
    } else if (!adminIdRegex.test(adminId.trim())) {
        errors.push('Admin ID must be alphanumeric and between 5-20 characters');
    }

    // Final status validation
    if (!final_status || typeof final_status !== 'string') {
        errors.push('Final status is required and must be a string');
    } else if (!['approved', 'rejected', 'pending'].includes(final_status.toLowerCase())) {
        errors.push('Final status must be one of: approved, rejected, pending');
    }

    // Scheme applied ID validation
    if (!scheme_applied_id || typeof scheme_applied_id !== 'string') {
        errors.push('Scheme applied ID is required and must be a string');
    } else if (!mongoose.Types.ObjectId.isValid(scheme_applied_id)) {
        errors.push('Invalid scheme applied ID format');
    }

    // ID validation
    if (!id || typeof id !== 'string') {
        errors.push('ID is required and must be a string');
    } else if (!mongoose.Types.ObjectId.isValid(id)) {
        errors.push('Invalid ID format');
    }

    // Password validation
    if (!password || typeof password !== 'string') {
        errors.push('Password is required and must be a string');
    } else if (password.length === 0) {
        errors.push('Password cannot be empty');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};
