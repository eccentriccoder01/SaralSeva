import banner from "./../assets/header-banner2.jpg";
import { 
  Mail,
  MapPin,
  User,
  BookUser,
  MessageSquare
} from "lucide-react";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'; 

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
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
    alert(data.message);

    // ✅ Reset form fields after success
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
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
                <Tooltip 
                  id="emailTooltip" 
                  style={tooltipStyle} 
                  place="top"
                />
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
                <Tooltip 
                  id="addressTooltip" 
                  style={tooltipStyle} 
                  place="top"
                />
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
                  className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
