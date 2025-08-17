import React from "react";
import banner from "./../assets/header-banner2.jpg";
import { Mail, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-orange-50/30 dark:bg-gray-900/50 transition-colors duration-300">
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
        <div className="text-center max-w-3xl">
          <h2 className="my-3 text-2xl font-bold text-orange-900 dark:text-orange-400">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            As a partner to the community, we look forward to your comments, suggestions, and any feedback that will help us provide better service. Here are the ways to contact us:
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-8">
          {/* Email & Phone Card */}
          <div className="flex-1 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-t-4 border-amber-500 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-amber-100 dark:bg-amber-700 rounded-full">
                <Mail className="w-10 h-10 text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-800 dark:text-gray-200">By Email & Phone</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Email: <a href="mailto:info@dgs.gov.in" className="font-semibold text-orange-700 dark:text-orange-400 hover:underline">info@dgs.gov.in</a>
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Phone: <span className="font-semibold text-orange-700 dark:text-orange-400">9876543210</span>
                </p>
              </div>
            </div>
          </div>

          {/* Address Card */}
          <div className="flex-1 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-t-4 border-amber-500 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-amber-100 dark:bg-amber-700 rounded-full">
                <MapPin className="w-10 h-10 text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-800 dark:text-gray-200">Our Address</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300 leading-relaxed">National Portal Secretariat</p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">CGO Complex, Lodhi Road,</p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">New Delhi - 110 003, India.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Right Side: Contact Form */}
          <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-t-4 border-amber-500">
            <h3 className="text-2xl font-bold text-center text-orange-900 dark:text-orange-400 mb-6">
              Send Us a Message
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Enter subject"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message here..."
                  className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                ></textarea>
              </div>
              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
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
