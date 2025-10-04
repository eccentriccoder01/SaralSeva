import React, { useState } from "react";
import { FaComment, FaPaperPlane, FaTimes, FaStar } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const FeedbackButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ New state for notification system
  const [notification, setNotification] = useState({
    isOpen: false,
    message: "",
    type: "success", // success | error | warning
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim() && rating === 0) {
      setNotification({
        isOpen: true,
        message: "Please provide feedback or a rating before submitting.",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setNotification({
        isOpen: true,
        message: `Thank you for your feedback! ${
          rating > 0 ? `Rating: ${rating} star(s).` : ""
        } We appreciate your input.`,
        type: "success",
      });

      setFeedback("");
      setEmail("");
      setRating(0);
      setHoverRating(0);
      setIsModalOpen(false);
    } catch (error) {
      setNotification({
        isOpen: true,
        message: "Failed to submit feedback. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const tooltipStyle = {
    backgroundColor: "#1f2937",
    color: "#fff",
    fontSize: "12px",
    borderRadius: "6px",
    padding: "6px 10px",
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRating(0);
    setHoverRating(0);
  };

  const closeNotification = () => {
    setNotification({ ...notification, isOpen: false });
  };

  return (
    <>
      {/* Feedback Button */}
      <div className="fixed bottom-8 left-8 z-50">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white p-5 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
          data-tooltip-id="feedback-button"
          data-tooltip-content="Share your feedback or report issues"
        >
          <FaComment className="text-2xl" />
          <span className="hidden group-hover:block text-sm font-medium whitespace-nowrap">
            Feedback
          </span>
        </button>
        <Tooltip id="feedback-button" place="top" style={tooltipStyle} />
      </div>

      {/* Feedback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-orange-900 dark:text-amber-100 flex items-center gap-2">
                  <FaComment className="text-orange-600" />
                  Share Your Feedback
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                  />
                </div>

                {/* Feedback */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Feedback
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Optional: Share suggestions, report issues..."
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none transition-all"
                  />
                  <div className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {feedback.length}/1000
                  </div>
                </div>

                {/* Rating */}
                <div className="flex flex-col items-center mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rate Your Experience
                  </label>
                  <div className="flex gap-2 justify-center mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={36}
                        className={`cursor-pointer transition-transform transform hover:scale-110 ${
                          (hoverRating > 0 ? hoverRating : rating) >= star
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-500"
                        }`}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                  <div
                    className={`mt-2 text-lg font-semibold text-center ${
                      (hoverRating > 0 ? hoverRating : rating) > 0
                        ? "text-orange-600 dark:text-amber-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {(hoverRating > 0 ? hoverRating : rating) > 0
                      ? ["😡 Very Bad", "🙁 Bad", "😐 Neutral", "🙂 Good", "😃 Very Good"][
                          (hoverRating > 0 ? hoverRating : rating) - 1
                        ]
                      : "No rating yet"}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={(!feedback.trim() && rating === 0) || isSubmitting}
                    className="flex-1 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Feedback
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Your feedback helps us improve SaralSeva for everyone
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Custom Notification Modal */}
      {notification.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
          <div
            className={`rounded-xl shadow-2xl max-w-sm w-full p-6 text-center ${
              notification.type === "success"
                ? "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100"
                : notification.type === "error"
                ? "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100"
                : "bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100"
            }`}
          >
            <p className="text-lg font-semibold">{notification.message}</p>
            <button
              onClick={closeNotification}
              className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;
