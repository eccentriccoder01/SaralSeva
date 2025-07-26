import notificationModel from "../models/notificationSchema.js"

const getEmployeeNotifications = async (req, res) => {
    try {
      const notifications = await notificationModel.find({ recipientType: "employee" })
        .sort({ createdAt: -1 })
        .populate('recipientId')
        .exec();
      
      return res.json({
        success: true,
        notifications
      });
    } catch (error) {
      console.error(error); 
      return res.status(500).json({
        success: false,
        message: "Something went wrong"
      });
    }
  };
  

const getAdminNotifications = async (req,res) =>{
    try {
        const notifications = await notificationModel.find({recipientType:"Admin"})
        .sort({createdAt:-1})
        .populate('recipientId')
        .exec()
        return res.json({
            success:true,
            notifications
        })
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
          success: false,
          message: "Something went wrong"
        });
    }
}

const getLimitAdminNotifications = async (req,res) =>{
    const notifications = await notificationModel.find({recipientType:"Admin"})
    .sort({createdAt:-1})
    .populate('recipientId')
    .limit(3)
    .exec()
    return res.json({
        success:true,
        notifications
    })
}

const getLimitEmployeeNotifications = async (req,res) =>{
  const {id} = req.body;
  const notifications = await notificationModel.find({recipientId:id})
  .sort({createdAt:-1})
  .populate('recipientId')
  .limit(3)
  .exec()
  return res.json({
      success:true,
      notifications
  })
}

const deleteNotification = async (req,res) =>{
    const {id} = req.body
    try {
        const notifications = await notificationModel.findByIdAndDelete(id)
        if (!notifications) {
            return res.json({
                success: false,
                message: "Notification not found"
            })
        }
        return res.json({
            success:true,
            message:"Notification deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const markAsRead = async (req,res) =>{
    const {notificationId} = req.body
    try {
       const notifications = await notificationModel.findById(notificationId);
       if (!notifications) {
           return res.json({
               success: false,
               message: "Notification not found"
           })
       }
       notifications.read = true
       await notifications.save();
       return res.json({
           success:true,
           message:"Notification marked as read"
       })
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:"Something went wrong"
        })
    }
}


export {getEmployeeNotifications,getAdminNotifications ,markAsRead , getLimitAdminNotifications,getLimitEmployeeNotifications ,deleteNotification}