import mongoose from "mongoose"

const notificationSchema = new mongoose.Schema({
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'recipientType'
    },
    recipientType: {
        type: String,
        required: true,
        enum: ['employee', 'Admin'] // Adjust based on your user roles
    },
    message: {
        required: true,
        type: String
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const notificationModel = mongoose.model("notification", notificationSchema) || mongoose.model("notification")

export default notificationModel
