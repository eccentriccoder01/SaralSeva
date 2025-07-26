import mongoose from "mongoose";

const grievanceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    DOB:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    grievance_category:{
        type:String,
        required:true
    },
    grievance_type:{
        type:String,
        required:true
    },
    document:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    grievance_registered_number:{
       type:String,
       required:true
    },
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
      },
    status:{
        type:String,
        enum:["pending","closed"],
        default:"pending"
    },
    remarks:{
        type:String,
    },
    createdAt:{
        type: Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
})

grievanceSchema.methods.updateStatus = function(status) {
    this.status = status;
    // return this.save();
  };

  grievanceSchema.methods.updateRemarks = function(remarks) {
    this.remarks = remarks;
    // return this.save();
  };

const grievanceModel = mongoose.model('grievances' , grievanceSchema) || mongoose.model('grievances')

export default grievanceModel

