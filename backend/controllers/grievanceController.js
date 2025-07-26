import mongoose from "mongoose";
import employeeModel from "../models/EmployeesModel.js";
import grievanceModel from "../models/grievanceModel.js";
import notificationModel from "../models/notificationSchema.js";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from 'cloudinary'

const applyGrievance = async (req, res) => {
   const { name, email, mobile, address, gender, grievance_type, grievance_category, description, country, state, district, DOB, id } = req.body;
   const userId = id;

   try {
      const user = await userModel.findById(userId)
      if (!user) {
         return res.json({
            success: false,
            message: "User not found"
         })
      }

      if (!req.file) {
         return res.status(400).send('No file uploaded.');
      }
      //  const pdf = req.pdf


      let pdfUrl = await cloudinary.uploader.upload(req.file.path, {
         resource_type: "raw"
      });

      const employees = await employeeModel.find({});

      if (employees.length === 0) {
         return res.json({
            success: false,
            message: "No employeees found"
         })
      }

      const randomEmployees = employees[Math.floor(Math.random() * employees.length)]

      const generateRegistrationNo = async () => {
         const prefix = "GRV"
         const randomDigits = Math.floor(100000 + Math.random() * 900000); // generates a 6-digit random number
         return `${prefix}${randomDigits}`;
      };

      // const document = req.files?.document && req.files?.document[0];

      const grievanceApplied = new grievanceModel({
         name,
         email,
         mobile,
         address,
         gender,
         description,
         DOB,
         grievance_category,
         grievance_type,
         country,
         state,
         district,
         grievance_registered_number: await generateRegistrationNo(),
         document: pdfUrl.secure_url,
         assigned_to: randomEmployees._id
      })

      await grievanceApplied.save();

      randomEmployees.assignedGrievances.push(grievanceApplied._id);

      await randomEmployees.save()

      user.grievances.push(grievanceApplied._id)

      await user.save();

      const notification = new notificationModel({
         recipientId: randomEmployees._id,
         recipientType: "employee",
         message: `You have been assigned a new grievance with ticket number:${grievanceApplied.grievance_registered_number}`
      })

      await notification.save();

      return res.json({
         success: true,
         message: "Grievances applied successfully",
         data: grievanceApplied
      })


   } catch (error) {
      console.log(error);
      return res.json({
         success: false,
         message: "Something went wrong"
      });
   }
}

const getAllGrievances = async (req, res) => {
   try {
      const grievance = await grievanceModel.find({})
         .sort({ createdAt: -1 })
         .populate('assigned_to')
         .exec()

      return res.json({
         success: true,
         message: "Successful",
         grievance
      })
   } catch (error) {
      console.log(error)
      return res.json({
         success: false,
         message: "Something went wrong"
      })
   }
}

const getSingleGrievance = async (req, res) => {
   const id = req.params.id;

   if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
         success: false,
         message: "Invalid or missing ID"
      });
   }
   try {
      const grievance = await grievanceModel.findById(id)
         .populate('assigned_to')
         .exec()

      return res.json({
         success: true,
         grievance
      })

   } catch (error) {
      console.log(error)
      return res.json({
         success: false,
         message: "Something went wrong"
      })
   }
}

export { applyGrievance, getAllGrievances, getSingleGrievance }