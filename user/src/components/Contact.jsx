import banner from "./../assets/header-banner2.jpg";
import { Mail, MapPin, User, BookUser, MessageSquare, CheckCircle, XCircle, AlertTriangle, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const tooltipStyle = {
  backgroundColor: "#FF9933",
  color: "#1F2937",
  padding: "8px 12px",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: 500,
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  zIndex: 9999,
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name only contain letters and spaces';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      
      const data = await res.json();
      
      if (res.ok) {
        alert(data.message || "Message sent successfully!");
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setErrors({});
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      setNotification({ type: "success", message: data.message });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: "Something went wrong. Please try again." });
    }
  };

  // Auto close modal after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const renderIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-10 h-10 text-green-500" />;
      case "error":
        return <XCircle className="w-10 h-10 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-10 h-10 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-orange-50/30 dark:bg-gray-900/50 transition-colors duration-300">
      {/* Banner */}
      <div
        className="relative flex items-center justify-center h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative text-5xl font-extrabold text-white jost tracking-wider">
          Contact Us
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center max-w-3xl mb-16">
          <h2 className="my-3 text-4xl font-bold text-orange-900 dark:text-orange-400">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            As a partner to the community, we look forward to your comments,
            suggestions, and any feedback that will help us provide better
            service. Here are the ways to contact us:
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl">
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl">
          <div className="flex flex-col gap-8">
            {/* Email & Phone Card */}
            <div className="flex-1 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-t-4 border-amber-500 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-6">
                <div
                  data-tooltip-id="emailTooltip"
                  data-tooltip-content="Reach us by email or phone"
                  className="p-4 bg-amber-100 dark:bg-amber-700 rounded-full cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <Mail className="w-10 h-10 text-amber-600 dark:text-amber-300" />
                </div>
                <Tooltip id="emailTooltip" style={tooltipStyle} place="top" />
                <div>
                  <h3 className="text-2xl font-bold text-stone-800 dark:text-gray-200">
                    By Email & Phone
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                    Email:{" "}
                    <a
                      href="mailto:info@dgs.gov.in"
                      className="font-semibold text-orange-700 dark:text-orange-400 hover:underline"
                    >
                      info@dgs.gov.in
                    </a>
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Phone:{" "}
                    <span className="font-semibold text-orange-700 dark:text-orange-400">
                      9876543210
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="flex-1 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-t-4 border-amber-500 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-6">
                <div
                  data-tooltip-id="addressTooltip"
                  data-tooltip-content="Visit our office at CGO Complex"
                  className="p-4 bg-amber-100 dark:bg-amber-700 rounded-full cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <MapPin className="w-10 h-10 text-amber-600 dark:text-amber-300" />
                </div>
                <Tooltip id="addressTooltip" style={tooltipStyle} place="top" />
                <div>
                  <h3 className="text-2xl font-bold text-stone-800 dark:text-gray-200">
                    Our Address
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                    National Portal Secretariat
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    CGO Complex, Lodhi Road,
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    New Delhi - 110 003, India.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-t-4 border-amber-500">
            <h3 className="text-2xl font-bold text-center text-orange-900 dark:text-orange-400 mb-8">
              Send Us a Message
            </h3>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors duration-200 ${
                      errors.name ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors duration-200 ${
                      errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`mt-1 w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors duration-200 resize-none ${
                    errors.message ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.message}</p>
                )}
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <div className="relative">
                  <BookUser className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Enter subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-amber-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                    isSubmitting 
                      ? 'opacity-50 cursor-not-allowed hover:scale-100' 
                      : 'hover:bg-amber-600'
                  }`}
                  className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Notification Modal */}
      {notification && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 px-8 py-6 text-center w-[90%] sm:w-[380px] animate-fadeIn">
            <button
              onClick={() => setNotification(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center space-y-4">
              {renderIcon(notification.type)}
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {notification.message}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}
      </style>
    </div>
  );
};

export default Contact;