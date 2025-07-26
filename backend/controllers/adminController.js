import adminModel from "../models/adminModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import schemeAppliedModel from "../models/schemeAppliedModel.js";
import mongoose from "mongoose";

const registerAdmin = async (req, res) => {
    const { name, email, mobile, password, adminId, gender } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const isEmailExist = await adminModel.findOne({ email });
        if (isEmailExist) {
            return res.json({
                success: false,
                message: "Email already exists"
            })
        }
        const isMobileExist = await adminModel.findOne({ mobile });
        if (isMobileExist) {
            return res.json({
                success: false,
                message: "Mobile number already exist"
            })
        }

        const isAdminIdExist = await adminModel.findOne({ adminId });
        if (isAdminIdExist) {
            return res.json({
                success: false,
                message: "Admin Id already exist"
            })
        }

        const newUser = new adminModel({
            name,
            email,
            mobile,
            password: hashedPassword,
            adminId,
            gender
        })
        await newUser.save();

        return res.json({
            success: true,
            message: "Admin registered successfully"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.json({
                success: false,
                message: "Admin not found"
            })
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Incorrect password"
            })
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
        return res.json({
            success: true,
            message: "Admin logged in successfully",
            token,
            admin,
            id: admin._id
        })
    } catch (error) {

    }
}

const getAdmin = async (req, res) => {
    const { id } = req.body;
    try {
        const admin = await adminModel.findById(id);
        return res.json({
            success: true,
            admin
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const getSingleAdmin = async (req, res) => {
    const id = req.params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid or missing ID"
        });
    }
    try {
        const admin = await adminModel.findById(id);
        return res.json({
            success: true,
            admin
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const adminChangeStatus = async (req, res) => {
    const { adminId, final_status, scheme_applied_id, id, password } = req.body;

    try {
        const admin = await adminModel.findById(id);
        if (!admin) {
            return res.json({
                success: false,
                message: "Admin not found"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) {
            return res.json({
                success: false,
                message: "Incorrect password"
            })
        }


        if (admin.adminId !== adminId) {
            return res.json({
                success: false,
                message: "Incorrect AdminID"
            })
        }

        const schemeApplied = await schemeAppliedModel.findById(scheme_applied_id);

        if (!schemeApplied) {
            return res.json({
                success: true,
                message: "Scheme applied id is incorrect"
            })
        }

        schemeApplied.updateFinalStatus(final_status)

        await schemeApplied.save()

        return res.json({
            success: true,
            message: "Status updated successfully"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }



}


export { registerAdmin, loginAdmin, getAdmin, getSingleAdmin, adminChangeStatus }