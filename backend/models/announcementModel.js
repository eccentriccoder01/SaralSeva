import mongoose from "mongoose"

const announcementSchema = new mongoose.Schema({
    announcement_details:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}) 

const announcementModel = mongoose.model("announcement" , announcementSchema) || mongoose.model("announcement")

export default announcementModel;