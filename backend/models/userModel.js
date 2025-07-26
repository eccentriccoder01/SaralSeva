import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
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
    gender:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    otp: { type: String },
    otp_expiry: { type: Date },
    schemes_applied: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'schemeApplied',
      },
    ],
    grievances: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'grievances',
      },
    ],
},{
    timestamps:true
})

const userModel = mongoose.model("User", userSchema) || mongoose.model("User")

export default userModel