import announcementModel from "../models/announcementModel.js"

const add_announcement = async (req, res) => {
    const {announcement_details} = req.body
    try {
        const newAnnouncement = new announcementModel({
            announcement_details
        })

        await newAnnouncement.save()
        return (
            res.json({
                success: true,
                message: "announcement added succesfully"
            })
        )
    } catch (error) {
        console.log(error);
        return (
            res.json({
                success: false,
                message: "announcement not added something went wrong"
            })
        )
    }
}

const getAnnouncement = async (req, res) => {
    try {
        const announcement = await announcementModel.find({})
        .sort({ createdAt: -1 })
        .exec();

        return (
            res.json({
                success: true,
                announcement
            })
        )
    } catch (error) {
        console.log(error);
        return (
            res.json({
                success: false,
                message: "something went wrong"
            })
        )
    }
}

export { add_announcement , getAnnouncement}