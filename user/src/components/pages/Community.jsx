import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import heroBg from "./../../../assets/baner-cpgrams_1.jpg";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

const UserLogin = ({ setIsAuthenticated }) => {
  const [loginType, setLoginType] = useState('otp');
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/loginUser`,
        formData
      );
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.user._id);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setError(res.data.message || "Login failed.");
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

  const handleGoogleLogin = async (id_token) => {
    setError(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/google`,
        { id_token, isRegistering: false }
      );

      if (res.data.success) {
        if (res.data.incomplete) {
          toast.success("Please complete your profile to finish registration");
          navigate("/auth/complete-registration", {
            state: {
              user: res.data.user,
              googleId: res.data.user.googleId,
            },
          });
        } else {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.user._id);
          setIsAuthenticated(true);
          navigate("/");
        }
      } else {
        setError(res.data.message || "Google login failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Google login failed.");
    }
  };
  
  const inputClasses = "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100";

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center p-4 bg-orange-50/30 dark:bg-gray-900/30" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
        <div className="relative w-full max-w-md p-8 space-y-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl">
            <h1 className="text-3xl font-bold text-center text-orange-900 dark:text-orange-400 jost">Welcome Back</h1>

            {/* Google Sign-In Button */}
            <div className="space-y-4">
              <div className="mb-6">
                <div className="w-full [&>div]:!w-full [&>div>div]:!w-full [&_iframe]:!w-full">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      const id_token = credentialResponse.credential;
                      handleGoogleLogin(id_token);
                    }}
                    onError={() => toast.error("Google sign-up failed")}
                    useOneTap
                    text="continue_with"
                    shape="rectangular"
                    logo_alignment="center"
                    style={{
                      width: '100%',
                      maxWidth: '400px'
                    }}
                  />
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>
            
            {/* Tab Switcher */}
            <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                <button 
                  onClick={() => setLoginType('otp')} 
                  className={`flex-1 p-2 rounded-md font-semibold transition-colors ${
                    loginType === 'otp' 
                      ? 'bg-orange-600 dark:bg-orange-500 text-white shadow' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Login with OTP
                </button>
                <button 
                  onClick={() => setLoginType('email')} 
                  className={`flex-1 p-2 rounded-md font-semibold transition-colors ${
                    loginType === 'email' 
                      ? 'bg-orange-600 dark:bg-orange-500 text-white shadow' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Login with Email
                </button>
            </div>
            
            {/* OTP Login Form */}
            {loginType === 'otp' && (
                <form onSubmit={handleOtpLogin} className="space-y-4 animate-in fade-in duration-300">
                    <div className="space-y-1">
                        <label htmlFor="mobile" className="font-medium text-gray-700 dark:text-gray-300">Mobile Number</label>
                        <input 
                          id="mobile" 
                          type="tel" 
                          onChange={(e) => setMobile(e.target.value)} 
                          placeholder="Enter 10-digit mobile number" 
                          required 
                          className={inputClasses} 
                        />
                    </div>
                    <Button 
                      className="w-full text-lg py-6 bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-500 dark:to-amber-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-px transition-all" 
                      type="submit"
                    >
                      Get OTP
                    </Button>
                </form>
            )}

            {/* Email Login Form */}
            {loginType === 'email' && (
                <form onSubmit={handleEmailLogin} className="space-y-4 animate-in fade-in duration-300">
                    <div className="space-y-1">
                        <label htmlFor="email" className="font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input 
                          id="email" 
                          type="email" 
                          placeholder="Enter your Email" 
                          required 
                          name="email" 
                          value={formData.email} 
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                          className={inputClasses} 
                        />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="password-email" className="font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input 
                          id="password-email" 
                          type="password" 
                          placeholder="Enter your Password" 
                          required 
                          name="password" 
                          value={formData.password} 
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                          className={inputClasses} 
                        />
                    </div>
                    <Button 
                      className="w-full text-lg py-6 bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-500 dark:to-amber-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-px transition-all" 
                      type="submit"
                    >
                      Log in
                    </Button>
                </form>
            )}

            {error && <p className="text-center text-red-600 dark:text-red-400 font-medium">{error}</p>}
            
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              Not registered yet?{' '}
              <Link to='/register' className="font-semibold text-orange-700 dark:text-orange-400 hover:underline">Register Now</Link>
            </p>
        </div>
    </div>
  );
};

export default UserLogin;