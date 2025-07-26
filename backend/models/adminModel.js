import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    adminId:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
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

const adminModel = mongoose.model("Admin" , adminSchema) || mongoose.model("Admin")

export default adminModel;