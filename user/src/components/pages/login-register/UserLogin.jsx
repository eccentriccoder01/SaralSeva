import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import heroBg from "./../../../assets/baner-cpgrams_1.jpg"; // Using a relevant background

const UserLogin = ({ setIsAuthenticated }) => {
  const [loginType, setLoginType] = useState('otp'); // 'otp' or 'email'
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/loginUser`, formData);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.user._id);
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/auth/generate-otp`, { mobile });
      if (res.data.message === "OTP sent successfully") {
        navigate("/auth/verify-otp", { state: { mobile } });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    }
  };
  
  const inputClasses = "w-full p-3 border border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none";

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center p-4 bg-orange-50/30" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl">
            <h1 className="text-3xl font-bold text-center text-orange-900 jost">Welcome Back</h1>
            
            {/* Tab Switcher */}
            <div className="flex bg-gray-200 rounded-lg p-1">
                <button onClick={() => setLoginType('otp')} className={`flex-1 p-2 rounded-md font-semibold transition-colors ${loginType === 'otp' ? 'bg-orange-600 text-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}>Login with OTP</button>
                <button onClick={() => setLoginType('email')} className={`flex-1 p-2 rounded-md font-semibold transition-colors ${loginType === 'email' ? 'bg-orange-600 text-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}>Login with Email</button>
            </div>
            
            {/* OTP Login Form */}
            {loginType === 'otp' && (
                <form onSubmit={handleOtpLogin} className="space-y-4 animate-in fade-in duration-300">
                    <div className="space-y-1">
                        <label htmlFor="mobile" className="font-medium text-gray-700">Mobile Number</label>
                        <input id="mobile" type="tel" onChange={(e) => setMobile(e.target.value)} placeholder="Enter 10-digit mobile number" required className={inputClasses} />
                    </div>
                    <Button className="w-full text-lg py-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-px transition-all" type="submit">Get OTP</Button>
                </form>
            )}

            {/* Email Login Form */}
            {loginType === 'email' && (
                <form onSubmit={handleEmailLogin} className="space-y-4 animate-in fade-in duration-300">
                    <div className="space-y-1">
                        <label htmlFor="email" className="font-medium text-gray-700">Email Address</label>
                        <input id="email" type="email" placeholder="Enter your Email" required name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClasses} />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="password-email" className="font-medium text-gray-700">Password</label>
                        <input id="password-email" type="password" placeholder="Enter your Password" required name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className={inputClasses} />
                    </div>
                    <Button className="w-full text-lg py-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-px transition-all" type="submit">Log in</Button>
                </form>
            )}

            {error && <p className="text-center text-red-600 font-medium">{error}</p>}
            
            <p className="text-sm text-center text-gray-600">
              Not registered yet?{' '}
              <Link to='/register' className="font-semibold text-orange-700 hover:underline">Register Now</Link>
            </p>
        </div>
    </div>
  );
};

export default UserLogin;