import express from "express";
import {
    subscribeNewsletter,
    unsubscribeNewsletter,
    getAllSubscribers,
    getNewsletterStats,
} from "../controllers/newsletterController.js";

const router = express.Router();

/**
 * @route   POST /api/newsletter/subscribe
 * @desc    Subscribe user to newsletter
 * @access  Public
 */
router.post("/subscribe", subscribeNewsletter);

/**
 * @route   POST /api/newsletter/unsubscribe
 * @desc    Unsubscribe user from newsletter
 * @access  Public
 */
router.post("/unsubscribe", unsubscribeNewsletter);

/**
 * @route   GET /api/newsletter/subscribers
 * @desc    Get all active newsletter subscribers (admin only)
 * @access  Private/Admin
 */
router.get("/subscribers", getAllSubscribers);

/**
 * @route   GET /api/newsletter/stats
 * @desc    Get newsletter subscription statistics (admin only)
 * @access  Private/Admin
 */
router.get("/stats", getNewsletterStats);

export default router;
