import mongoose from 'mongoose';
import 'dotenv/config';

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      family: 4,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};
