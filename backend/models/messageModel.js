import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderType: {
        type: String,
        required: true,
        enum: ['employee', 'Admin'] // Adjust based on your user roles
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'senderType'
    },
    receiverType: {
        type: String,
        required: true,
        enum: ['employee', 'Admin'] // Adjust based on your user roles
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'receiverType'
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
});

const messageModel = mongoose.model("message", messageSchema) || mongoose.model("messageModel");
export default messageModel;
