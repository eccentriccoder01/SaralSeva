import employeeModel from "../models/EmployeesModel.js";
import schemeAppliedModel from "../models/schemeAppliedModel.js";
import { v2 as cloudinary } from 'cloudinary'
import userModel from "../models/userModel.js";
import 'dotenv/config'
import notificationModel from "../models/notificationSchema.js";
import mongoose from "mongoose";
import twilio from 'twilio'

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const applyScheme = async (req, res) => {
    const { name, email, mobile, scheme_name, scheme_code, DOB, gender, occupation, panNo, address, aadharNo, nationality, income, bank_account_no, ifsc_code, bank_name, bank_branch, govt_officials, id } = req.body;

    // Server-side validation
    const errors = {};
    const validateEmail = (value) => /^\S+@\S+\.\S+$/.test(String(value || "").trim());
    const validateMobile = (value) => /^[0-9]{10}$/.test(String(value || "").trim());

    if (!name || String(name).trim().length < 3) errors.name = 'Name is required and must be at least 3 characters';
    if (!email || !validateEmail(email)) errors.email = 'Please enter a valid email';
    if (!mobile || !validateMobile(mobile)) errors.mobile = 'Mobile number must be exactly 10 digits';
    if (!scheme_name) errors.scheme_name = 'Scheme name is required';
    if (!scheme_code) errors.scheme_code = 'Scheme code is required';
    if (!occupation || String(occupation).trim().length === 0) {
        errors.occupation = 'Occupation is required';
    }

    // Aadhar and PAN basic length checks if provided
    if (aadharNo && String(aadharNo).trim().length !== 12) errors.aadharNo = 'Aadhar number must be 12 digits';
    if (panNo && String(panNo).trim().length !== 10) errors.panNo = 'PAN must be 10 characters';

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    try {
        const generateRegistrationNo = async () => {
            const prefix = scheme_code?.split('/')[0];
            const randomDigits = Math.floor(100000 + Math.random() * 900000);
            return `${prefix}${randomDigits}`;
        };

        const photo = req.files?.photo && req.files?.photo[0]
        const aadharPhoto = req.files?.aadharPhoto && req.files?.aadharPhoto[0]
        const panPhoto = req.files?.panPhoto && req.files?.panPhoto[0]
        const bank_passbook = req.files?.bank_passbook && req.files?.bank_passbook[0]

        const pdf = [photo, aadharPhoto, panPhoto, bank_passbook].filter((item) => item !== undefined)

        let pdfUrl = await Promise.all(pdf.map(async (pdf) => {
            let result = await cloudinary.uploader.upload(pdf.path, {
                resource_type: 'raw'
            })
            return result.secure_url
        }))

        const employees = await employeeModel.find({});

        if (employees.length === 0) {
            return res.status(500).json({
                success: false,
                message: "No employees found"
            });
        }

        const randomEmployee = employees[Math.floor(Math.random() * employees.length)];

        const newSchemeApplied = new schemeAppliedModel({
            name,
            email,
            mobile,
            scheme_name,
            scheme_code,
            DOB,
            gender,
            occupation,
            panNo,
            address,
            aadharNo,
            nationality,
            income,
            bank_account_no,
            ifsc_code,
            bank_name,
            bank_branch,
            govt_officials,
            registration_no: await generateRegistrationNo(),
            photo: pdfUrl[0],
            aadharPhoto: pdfUrl[1],
            panPhoto: pdfUrl[2],
            bank_passbook: pdfUrl[3],
            assigned_to: randomEmployee._id,
        });

        await newSchemeApplied.save();

        randomEmployee.assignedSchemes.push(newSchemeApplied._id);
        await randomEmployee.save();

        const user = await userModel.findById(id);
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        user.schemes_applied.push(newSchemeApplied._id);
        await user.save();

        const notification = new notificationModel({
            recipientId: randomEmployee._id,
            recipientType: 'employee',
            message: `You have been assigned a new ticket: ${newSchemeApplied.scheme_name}. Registration Number: ${newSchemeApplied.registration_no}`
        })

        await notification.save()


        await twilioClient.messages.create({
            body: `Dear ${newSchemeApplied.name}, you have successfully applied for ${newSchemeApplied.scheme_name}. Registration Number: ${newSchemeApplied.registration_no}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+91${7326074744}`,
        });

        return res.json({
            success: true,
            message: "Scheme applied successfully",
            data: newSchemeApplied
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Something went wrong"
        });
    }
};

const getAppliedSchemes = async (req, res) => {
    try {
        const appliedSchemes = await schemeAppliedModel.find({})
        .sort({ createdAt: -1 });

        return res.json({
            success: true,
            appliedSchemes
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Something went wrong"
        });
    }
};

const getAllSchemes = async (req, res) => {
    try {
        const schemes = await schemeAppliedModel.find({})
            .sort({createdAt:-1})
            .populate('assigned_to')
            .exec();
        return res.json({
            success: true,
            schemes
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const getSingleAppliedScheme = async (req, res) => {
    const id = req.params.id

    ;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing ID"
    });
  }
    try {
        const appliedScheme = await schemeAppliedModel.findById(id)
            .populate('assigned_to')
            .exec();
        return res.json({
            success: true,
            appliedScheme
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const checkSchemeStatus = async (req, res) => {
    const { registration_no} = req.body
    try {
        const schemeApplied = await schemeAppliedModel.findOne({registration_no})
        return res.json({
            success: true,
            schemeApplied
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

export { applyScheme, getAppliedSchemes, getAllSchemes, getSingleAppliedScheme ,checkSchemeStatus};
