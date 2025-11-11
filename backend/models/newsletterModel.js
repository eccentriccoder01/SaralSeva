import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    subscriptionDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    unsubscribeDate: {
        type: Date,
        default: null
    },
}, { timestamps: true });

// Index for efficient isActive lookups
newsletterSchema.index({ isActive: 1 });

export default mongoose.model("Newsletter", newsletterSchema);
