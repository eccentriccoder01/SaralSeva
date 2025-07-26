import mongoose from 'mongoose'

const schemeAppliedSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    scheme_name:{
        type:String,
        required:true
    },
    scheme_code:{
        type:String,
        required:true
    },
    DOB:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    occupation:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    aadharNo:{
        type:String,
        required:true
    },
    aadharPhoto:{
        type:String,
        required:true
    },
    panNo:{
        type:String,
        required:true
    },
    panPhoto:{
        type:String,
        required:true
    },
    nationality:{
        type:String,
        required:true
    },
    income:{
        type:String,
        required:true
    },
    bank_account_no:{
        type:String,
        required:true
    },
    ifsc_code:{
        type:String,
        required:true
    },
    bank_name:{
        type:String,
        required:true
    },
    bank_branch:{
        type:String,
        required:true
    },
    bank_passbook:{
        type:String,
        required:true
    },
    govt_officials:{
        type:String,
        required:true
    },
    registration_no:{
        type:String
    },
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
      },
    initial_status:{
        type:String,
        enum:["pending","Sent to Modal Officer"],
        default:"pending"
    },
    final_status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    },
    remarks:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    employeeUpdatedAt: { 
        type: Date,
        default:Date.now 
    }
},
{
    timestamps:true
});

schemeAppliedSchema.methods.updateInitialStatus = function(status) {
    this.initial_status = status;
    // return this.save();
  };

  schemeAppliedSchema.methods.updateRemarks = function(remarks) {
    this.remarks = remarks;
    // return this.save();
  };
  
  schemeAppliedSchema.methods.updateFinalStatus = function(status) {
    this.final_status = status;
  };

const schemeAppliedModel = mongoose.model("schemeApplied" , schemeAppliedSchema) || mongoose.model("schemeApplied")

export default schemeAppliedModel