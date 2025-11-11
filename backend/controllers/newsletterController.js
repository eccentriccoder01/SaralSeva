import Newsletter from "../models/newsletterModel.js";

// Subscribe to newsletter
export const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email || !email.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        // Validate email format
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Check if email already exists
        const existingSubscription = await Newsletter.findOne({
            email: normalizedEmail
        });

        if (existingSubscription) {
            // If they were previously unsubscribed, reactivate them
            if (!existingSubscription.isActive) {
                existingSubscription.isActive = true;
                existingSubscription.unsubscribeDate = null;
                await existingSubscription.save();
                return res.status(200).json({
                    success: true,
                    message: "Successfully resubscribed to newsletter",
                });
            }

            return res.status(409).json({
                success: false,
                message: "already_subscribed",
                error: "This email is already subscribed to our newsletter",
            });
        }

        // Create new newsletter subscription
        const newSubscription = new Newsletter({
            email: normalizedEmail,
            subscriptionDate: new Date(),
            isActive: true,
        });

        await newSubscription.save();

        return res.status(201).json({
            success: true,
            message: "Successfully subscribed to newsletter",
            data: {
                email: newSubscription.email,
                subscriptionDate: newSubscription.subscriptionDate,
            },
        });
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while subscribing to newsletter",
            error: error.message,
        });
    }
};

// Unsubscribe from newsletter
export const unsubscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !email.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const subscription = await Newsletter.findOne({
            email: normalizedEmail
        });

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Email not found in newsletter subscription",
            });
        }

        // Soft delete - mark as inactive
        subscription.isActive = false;
        subscription.unsubscribeDate = new Date();
        await subscription.save();

        return res.status(200).json({
            success: true,
            message: "Successfully unsubscribed from newsletter",
        });
    } catch (error) {
        console.error("Newsletter unsubscribe error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while unsubscribing from newsletter",
            error: error.message,
        });
    }
};

// Get all active newsletter subscribers (admin only)
export const getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Newsletter.find({ isActive: true })
            .select("email subscriptionDate")
            .sort({ subscriptionDate: -1 });

        return res.status(200).json({
            success: true,
            message: "Newsletter subscribers retrieved successfully",
            count: subscribers.length,
            data: subscribers,
        });
    } catch (error) {
        console.error("Get subscribers error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching subscribers",
            error: error.message,
        });
    }
};

// Get newsletter subscription statistics (admin only)
export const getNewsletterStats = async (req, res) => {
    try {
        const totalSubscribers = await Newsletter.countDocuments({ isActive: true });
        const totalUnsubscribed = await Newsletter.countDocuments({ isActive: false });
        const totalAll = await Newsletter.countDocuments({});

        return res.status(200).json({
            success: true,
            message: "Newsletter statistics retrieved successfully",
            data: {
                activeSubscribers: totalSubscribers,
                unsubscribedCount: totalUnsubscribed,
                totalCount: totalAll,
            },
        });
    } catch (error) {
        console.error("Get stats error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching newsletter statistics",
            error: error.message,
        });
    }
};
