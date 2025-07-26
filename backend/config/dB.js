import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDb = async () =>{
   try {
     await mongoose.connect(process.env.MONGODB_URL);
     console.log("MongoDB connected")
   } catch (error) {
     console.log(error)
     console.log("MongoDB connection error")
   }
}
