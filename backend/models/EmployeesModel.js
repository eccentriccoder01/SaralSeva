import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    empId: {
        type: String,
        required: true,
        unique: true
    },
    assignedSchemes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'schemeApplied'
        }
    ],
    assignedGrievances: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'grievances'
        }
    ],
    address:{
        type:String,
    },
    profilePic:{
        type:String
    },
    DOB:{
        type:String
    },
    aadhar_no:{
        type:Number
    },
    pan_no:{
        type:String
    }
})

const employeeModel = mongoose.model("employee", employeeSchema) || mongoose.model("employee")



export default employeeModel