import employeeModel from "../models/EmployeesModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import schemeAppliedModel from "../models/schemeAppliedModel.js";
import twilio from 'twilio'
import 'dotenv/config'
import notificationModel from "../models/notificationSchema.js";
import grievanceModel from "../models/grievanceModel.js";
import { v2 as cloudinary } from 'cloudinary'



// Twilio setup
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const register_employee = async (req, res) => {
   const { name, email, mobile, gender, password, DOB, empId } = req.body;
   const isEmailExist = await employeeModel.findOne({ email });

   const hashedPassword = await bcrypt.hash(password, 10)
   try {
      if (isEmailExist) {
         return res.json({
            success: true,
            message: "Email already exists"
         })
      }

      const isMobileExist = await employeeModel.findOne({ mobile });
      if (isMobileExist) {
         return res.json({
            success: true,
            message: "Mobile already exists"
         })
      }

      const isEmpIdExists = await employeeModel.findOne({ empId })
      if (isEmpIdExists) {
         return res.json({
            success: true,
            message: "Employee Id already exists"
         })
      }

      const newEmployee = new employeeModel({
         name,
         email,
         password: hashedPassword,
         mobile,
         gender,
         DOB,
         empId
      })

      await newEmployee.save();

      return res.json({
         success: true,
         message: "Employee registered successfully"
      })
   } catch (error) {
      console.log(error)
      return res.json({
         success: false,
         message: "Something went wrong"
      })
   }
}

const login_employee = async (req, res) => {
   const { email, password } = req.body;
   try {
      const employee = await employeeModel.findOne({ email })
      if (!employee) {
         return res.json({
            success: false,
            message: "Employee not found"
         })
      }

      const isPasswordMatch = await bcrypt.compare(password, employee.password)

      if (!isPasswordMatch) {
         return res.json({
            success: false,
            message: "Incorrect password"
         })
      }

      const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET)

      return res.json({
         success: true,
         message: "Employee logged in successfully",
         token,
         employee,
         id: employee._id
      })

   } catch (error) {
      console.log(error)
      return res.json({
         success: false,
         message: "Something went wrong"
      })
   }
}

const getAllEmployee = async (req, res) => {
   try {
      const employees = await employeeModel.find({});
      return res.json({
         success: true,
         employees
      })
   } catch (error) {
      console.log(error)
      return res.json({
         success: false,
         message: "Something went wrong"
      })
   }
}


const getSingleEmployee = async (req, res) => {
   const id = req.params.id
   try {
      const employee = await employeeModel.findById(id)
      return res.json({
         success: true,
         employee
      })
   } catch (error) {
      console.log(error)
      return res.json({
         success: false,
         message: "Something went wrong"
      })
   }
}

const empChangeStatus = async (req, res) => {
   const { id, empID, initial_status, password, remarks, scheme_applied_id } = req.body


   try {
      const employee = await employeeModel.findById(id)

      if (!employee) {
         return res.json({
            success: false,
            message: "Employee not found"
         })
      }

      const isPasswordMatch = await bcrypt.compare(password, employee.password)
      if (!isPasswordMatch) {
         return res.json({
            success: false,
            message: "Incorrect password"
         })
      }

      const IsEmpId = employee.empId
      if (IsEmpId !== empID) {
         return res.json({
            success: false,
            message: "Incorrect Employee Id"
         })
      }

      const schemes_applied = await schemeAppliedModel.findById(scheme_applied_id);
      if (!schemes_applied) {
         return res.json({
            success: false,
            message: "Scheme not found"
         })
      }


      schemes_applied.updateInitialStatus(initial_status);
      schemes_applied.updateRemarks(remarks);
      schemes_applied.employeeUpdatedAt = Date.now();

      await schemes_applied.save();

         await twilioClient.messages.create({
            body: `Dear ${schemes_applied.name},The status of your application for the  ${schemes_applied.scheme_name} scheme has been updated. Your registration number is ${schemes_applied.registration_no}, and the current status of your application is now ${initial_status}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+91${7326074744}`,
        });

      const adminId = "67121931588bf0a6336055a4";

      const notification = new notificationModel({
         recipientId: adminId, 
         recipientType: 'Admin',
         message: `The status of the scheme with registration number ${schemes_applied.registration_no} has been updated by employee ${employee.name}.`
      })

      await notification.save();


      return res.json({
         success: true,
         message: "Status changed successfully"
      })

   } catch (error) {
      console.log(error)
      return res.json({
         success: false,
         message: "Something went wrong"
      })
   }
}

const employeePerformance = async (req, res) => {
   const { id } = req.body;
   try {
      const schemeApplied = await schemeAppliedModel.find({})
         .populate('assigned_to')
         .exec();

      const filteredSchemeApplied = schemeApplied.filter((scheme) => scheme.assigned_to._id.toString() === id);
      const totalTicket = filteredSchemeApplied.length;
      const openTicket = filteredSchemeApplied.filter((scheme) => scheme.initial_status === 'pending').reduce((acc, cur) => acc + 1, 0);
      const closeTicket = totalTicket - openTicket;
      const data = [{
         total: totalTicket,
         close: closeTicket,
         open: openTicket
      }]
      return res.json({
         success: true,
         data
      })
   } catch (error) {
      console.log(error)
      return res.json({
         success: false,
         message: "Something went wrong"
      })
   }
}

const employeeGrievancePerformance = async(req,res) =>{

   const {id} = req.body;
   try {
      const grievance = await grievanceModel.find({assigned_to:id})
      .populate('assigned_to')
      .exec();

      const totalGrievance = grievance.length;
      const openGrievance = grievance.filter((grievance) => grievance.status === 'pending').reduce((acc, cur) => acc + 1, 0);
      const closeGrievance = totalGrievance - openGrievance;
      const data = [{
         total: totalGrievance,
         close: closeGrievance,
         open: openGrievance
      }]
      
      return res.json({
         success:true,  
         data
      })
   } catch (error) {
      console.log(error)
   }
}


const editEmployee = async (req, res) => {
   const {address, DOB , aadhar_no, pan_no , id} = req.body
   try {

      if (!req.file) {
         return res.status(400).send('No file uploaded.');
      }

      let pdfUrl = await cloudinary.uploader.upload(req.file.path, {
         resource_type: "raw"
      });

      const employee = await employeeModel.findById(id)
      if (!employee) {
         return res.json({
            success: false,
            message: "Employee not found"
         })
      }

      employee.address = address
      employee.DOB = DOB
      employee.aadhar_no = aadhar_no
      employee.pan_no = pan_no
      employee.profilePic = pdfUrl.secure_url;
      await employee.save()
      return res.json({
         success: true,
         message: "Employee updated successfully"
      })
   } catch (error) {
      console.log(error)
      return res.json({
         success: false,
         message: "Something went wrong"
      })
   }
}


const empGrievanceChangeStatus = async (req, res) => {
   const { id, empID, status, password, remarks, grievance_id } = req.body


   try {
      const employee = await employeeModel.findById(id)

      if (!employee) {
         return res.json({
            success: false,
            message: "Employee not found"
         })
      }

      const isPasswordMatch = await bcrypt.compare(password, employee.password)
      if (!isPasswordMatch) {
         return res.json({
            success: false,
            message: "Incorrect password"
         })
      }

      const IsEmpId = employee.empId
      if (IsEmpId !== empID) {
         return res.json({
            success: false,
            message: "Incorrect Employee Id"
         })
      }

      const grievance = await grievanceModel.findById(grievance_id);
      if (!grievance) {
         return res.json({
            success: false,
            message: "Scheme not found"
         })
      }


      grievance.updateStatus(status);
      grievance.updateRemarks(remarks);
      grievance.updatedAt = Date.now();

      await grievance.save();

         await twilioClient.messages.create({
            body: `Dear ${grievance.name},The status of your grievance has been updated. Your grievance number is ${grievance.grievance_registered_number}, and the current status of your grievance is now changed. Log in to your dashboard to see the status`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+91${7326074744}`,
        });

      const adminId = "67121931588bf0a6336055a4";

      const notification = new notificationModel({
         recipientId: adminId, 
         recipientType: 'Admin',
         message: `The status of the grievance with  number ${grievance.grievance_registered_number } has been updated by employee ${employee.name}.`
      })

      await notification.save();


      return res.json({
         success: true,
         message: "Status changed successfully"
      })

   } catch (error) {
      console.log(error)
      return res.json({
         success: false,
         message: "Something went wrong"
      })
   }
}



export { register_employee, login_employee, getAllEmployee, getSingleEmployee, empChangeStatus, employeePerformance ,employeeGrievancePerformance ,editEmployee ,empGrievanceChangeStatus}