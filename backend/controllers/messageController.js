import adminModel from "../models/adminModel.js";
import employeeModel from "../models/EmployeesModel.js";
import messageModel from "../models/messageModel.js";
import mongoose from "mongoose";




const sendMessage = async (req, res) => {
    const { senderType, sender, receiver, message, receiverType } = req.body;
    try {
        if (senderType === "employee") {
            const employee = await employeeModel.findById(sender);
            if (!employee) {
                return res.json({
                    success: false,
                    message: "Employee not found"
                })
            }
            const admin = await adminModel.findById(receiver)
            if (!admin) {
                return res.json({
                    success: false,
                    message: "Admin not found"
                })
            }
        } else if (senderType === "Admin") {
            const admin = await adminModel.findById(sender);
            if (!admin) {
                return res.json({
                    success: false,
                    message: "Admin not found"
                })
            }
            const employee = await employeeModel.findById(receiver)
            if (!employee) {
                return res.json({
                    success: false,
                    message: "Employee not found"
                })
            }
        }

        const newMessage = new messageModel({
            senderType,
            receiverType,
            sender,
            receiver,
            message
        })

        await newMessage.save();

        return res.json({
            success: true,
            message: "Message sent successfully"
        })

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const getMessages = async (req, res) => {
    const { sender, receiver } = req.body;
    try {
        const message = await messageModel.find({
            $or: [
                { sender: sender, receiver: receiver },
                { sender: receiver, receiver: sender }
            ]
        }).populate('sender')
            .populate('receiver')


        return res.json({
            success: true,
            message
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const getMesagesFromSender = async (req, res) => {
    const { sender } = req.body;
    try {
        const messages = await messageModel.find({ sender: sender })
            .populate('sender')
            .populate('receiver')
        return res.json({
            success: true,
            messages
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const getUniqueReciepents = async (req, res) => {
    const { sender, senderType, receiverType } = req.body;
    try {
        const recipientIds = await messageModel.distinct("receiver", { sender: sender, senderType: senderType, receiverType: receiverType })

        const recipients = await employeeModel.find({ _id: { $in: recipientIds } })
        return res.json({
            success: true,
            recipients
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}



const getUniqueRecipientsWithLatestMessage = async (req, res) => {
    const { sender, senderType } = req.body; // This would be the admin's ID and type
    try {
        // Get the distinct recipient IDs
        const recipientIds = await messageModel.distinct("receiver", { sender: sender, senderType: senderType });

        // Fetch the user details of the recipients and their latest message
        const recipientsWithMessages = await Promise.all(recipientIds.map(async (recipientId) => {
            const recipient = await employeeModel.findById(recipientId); // Replace UserModel with your actual user model
            const latestMessage = await messageModel.findOne({
                $or: [
                    { sender: sender, receiver: recipientId, senderType: senderType },
                    { sender: recipientId, receiver: sender, receiverType: 'Admin' }
                ]
            }).sort({ createdAt: -1 });

            return {
                recipient,
                latestMessage
            };
        }));

        return res.json({
            success: true,
            recipients: recipientsWithMessages
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Something went wrong"
        });
    }
};

const getUniqueRecipientsWithLatestMessageForEmployee = async (req, res) => {
    const { sender, senderType } = req.body; // This would be the admin's ID and type
    try {
        // Get the distinct recipient IDs
        const recipientIds = await messageModel.distinct("receiver", { sender: sender, senderType: senderType });

        // Fetch the user details of the recipients and their latest message
        const recipientsWithMessages = await Promise.all(recipientIds.map(async (recipientId) => {
            const recipient = await adminModel.findById(recipientId); // Replace UserModel with your actual user model
            const latestMessage = await messageModel.findOne({
                $or: [
                    { sender: sender, receiver: recipientId, senderType: senderType },
                    { sender: recipientId, receiver: sender, receiverType: 'Admin' }
                ]
            }).sort({ createdAt: -1 });

            return {
                recipient,
                latestMessage
            };
        }));

        return res.json({
            success: true,
            recipients: recipientsWithMessages
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Something went wrong"
        });
    }
};

const getNewMessage = async (req, res) => {
    const { receiver } = req.body;
    try {
        const messages = await messageModel.find({ receiver: receiver })
        .populate('sender')
        .sort({ createdAt: -1 })
        .limit(3);
        return res.json({
            success: true,
            messages
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}



  


export { sendMessage, getMessages, getMesagesFromSender, getUniqueReciepents, getUniqueRecipientsWithLatestMessage, getNewMessage ,getUniqueRecipientsWithLatestMessageForEmployee }