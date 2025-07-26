import React from "react";
import banner from "./../assets/header-banner2.jpg";
import { Mail, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-orange-50/30">
      <div
        className="relative flex items-center justify-center h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative text-5xl font-extrabold text-white jost tracking-wider">Contact Us</h1>
      </div>
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center max-w-3xl">
            <h2 className="my-3 text-2xl font-bold text-orange-900">Get in Touch</h2>
            <p className="text-lg text-gray-600">
            As a partner to the community, we look forward to your comments, suggestions, and any feedback that will help us provide better service. Here are the ways to contact us:
            </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 mt-12">
          <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl border-t-4 border-amber-500 transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center gap-6">
                <div className="p-4 bg-amber-100 rounded-full">
                    <Mail className="w-10 h-10 text-amber-600" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-stone-800">By Email & Phone</h3>
                    <p className="mt-1 text-gray-600">Email: <a href="mailto:info@dgs.gov.in" className="font-semibold text-orange-700 hover:underline">info@dgs.gov.in</a></p>
                    <p className="text-gray-600">Phone: <span className="font-semibold text-orange-700">9876543210</span></p>
                </div>
            </div>
          </div>
          
          <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl border-t-4 border-amber-500 transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center gap-6">
                <div className="p-4 bg-amber-100 rounded-full">
                    <MapPin className="w-10 h-10 text-amber-600" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-stone-800">Our Address</h3>
                    <p className="mt-1 text-gray-600">National Portal Secretariat</p>
                    <p className="text-gray-600">CGO Complex, Lodhi Road,</p>
                    <p className="text-gray-600">New Delhi - 110 003, India.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;