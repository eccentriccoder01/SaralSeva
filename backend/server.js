import express from 'express'
import cors from 'cors'
import schemesRouter from './routes/schemesRouter.js';
import announcementRouter from './routes/announcementRouter.js';
import { connectDb } from './config/dB.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import userModel from './models/userModel.js';
import twilio from 'twilio'
import adminRouter from './routes/adminRouter.js';
import employeeRouter from './routes/employeeRouter.js';
import schemeAppliedRouter from './routes/schemeAppliedRouter.js';
import notificationRouter from './routes/notificationRouter.js';
import grievanceRouter from './routes/grievanceRouter.js';
import messageRouter from './routes/messageRouter.js';





const app = express();
const PORT = 5000;

app.use(express.json())
app.use(cors());

connectDb();
connectCloudinary();


app.use('/api/v1/schemes', schemesRouter)
app.use('/api/v1/announcement', announcementRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/employee',employeeRouter)
app.use('/api/v1/user/scheme', schemeAppliedRouter)
app.use('/api/v1/notification', notificationRouter)
app.use('/api/v1/grievances' , grievanceRouter)
app.use('/api/v1/messages' , messageRouter)




// Twilio setup
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// OTP generation
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

app.post('/api/v1/user/auth/generate-otp', async (req, res) => {
    const { mobile } = req.body;
    const user = await userModel.findOne({ mobile });
    if (!user) {
        return res.json({
            succcess: false,
            message: 'User not found',
        })
    }


    const otp = generateOtp();
    const otp_expiry = new Date(Date.now() + 20 * 60000); // 10 minutes expiry

    try {


        const  user = await userModel.findOneAndUpdate(
            { mobile },
            { otp, otp_expiry: otp_expiry },
            { upsert: true, new: true }
        );


        await twilioClient.messages.create({
            body: `Your OTP code is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+91${7326074744}`,
        });

        return res.json({
            success: true,
            message: 'OTP sent successfully',
            user,
        })
        
    } catch (error) {
        console.error('Failed to send OTP:', error);
        res.status(500).send('Failed to send OTP');
    }

});



app.post('/api/v1/user/auth/verify-otp', async (req, res) => {
    const { mobile, otp } = req.body;
    try {
        const user = await userModel.findOne({ mobile, otp, otp_expiry: { $gte: new Date() } });

        if (!user) {
            return res.status(400).send('Invalid OTP');
        }

        user.otp = undefined;
        user.otp_expiry = undefined;
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'OTP verified', token , user });
    } catch (error) {
        console.error('Failed to verify OTP:', error);
        res.status(500).send('Failed to verify OTP');
    }
});




app.get('/', (req, res) => {
    res.send(`API is running`)
})

app.listen(PORT, () => {
    console.log(`server is runinng on PORT: ${PORT}`)
})
