import React, { useState } from "react";
import sms from "./../../../assets/register-sms.png";
import { Button } from "@/components/ui/button";
import { CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // 👁 for toggle
import { GoogleLogin } from "@react-oauth/google"; // Google OAuth

// ✅ Schema with confirmPassword + refine
const schema = z.object({
  name: z.string()
    .min(1, { message: "Name is required" })
    .regex(/^[A-Za-z\s]+$/, { message: "Name should contain only letters and spaces" }),
  email: z.string()
    .email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
  mobile: z.string()
    .length(10, { message: "Mobile number must be 10 digits" })
    .regex(/^[0-9]+$/, { message: "Invalid mobile number" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]  
});

const RegisterForm = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [countryid, setCountryid] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // ✅ Password toggle state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // ✅ Password strength checker
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
  });

  const getPasswordStrengthColor = (condition) => {
    return condition ? "text-green-600" : "text-gray-400";
  };

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({ 
    resolver: zodResolver(schema),
    mode: "onChange" // This will validate on every change
  });
  
  const password = watch("password");
  const nameValue = watch("name");
  const emailValue = watch("email");

  // Track password strength
  React.useEffect(() => {
    if (!password) return;
    setPasswordStrength({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  // Google Sign-Up Handler
  const handleGoogleSignUp = async (id_token) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/google`,
        { id_token, isRegistering: true }
      );

      if (res.data.success) {
        if (res.data.incomplete) {
          // User needs to complete registration
          toast.success("Please complete your profile to finish registration");
          navigate("/auth/complete-registration", {
            state: {
              user: res.data.user,
              googleId: res.data.user.googleId,
            },
          });
        } else {
          // User already exists and is complete
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.user._id);
          setIsAuthenticated && setIsAuthenticated(true);
          toast.success("Signed up with Google successfully!");
          navigate("/");
        }
      } else {
        toast.error(res.data.message || "Google sign-up failed.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Google sign-up failed.");
    }
  };

  // ✅ Send OTP with validation
  const handleSendOtp = async (mobile) => {
    if (!mobile || mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/employee/send-otp`, { phone: mobile });
      toast.success("OTP sent successfully!");
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP with validation
  const handleVerifyOtp = async (mobile) => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }
    
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/employee/verify-otp`, { phone: mobile, otp });
      toast.success("Phone number verified!");
      setIsPhoneVerified(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };
  
  const onSubmit = async (data) => {
    if (!isPhoneVerified) {
      toast.warning("Phone number not verified via OTP (optional)", {
        style: { background: '#92400E', color: 'white', border: 'none' },
      });
    }

    try {
      const formData = new FormData();
      for (const key in data) {
        if (key !== "confirmPassword") {
          formData.append(key, data[key]);
        }
      }
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/registerUser`, data);
      if (res.data.success) {
        toast.success("User registered successfully!", {
          style: { background: '#166534', color: 'white', border: 'none' },
        });
        setTimeout(() => navigate("/userlogin"), 2000); // Redirect after 2 seconds
      } else {
        toast.error(res.data.message || "Registration failed.", {
          style: { background: '#991B1B', color: 'white', border: 'none' },
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.", {
        style: { background: '#991B1B', color: 'white', border: 'none' },
      });
    }
  };
  
  const inputClasses = "dark:text-black w-full p-3 border border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none";
  const errorClasses = "text-red-600 text-sm mt-1";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="min-h-[70vh] py-10 bg-orange-50/30 flex items-center justify-center">
      <Toaster position="top-center" richColors />
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
          <div className="text-center lg:text-left lg:w-1/3">
            <img src={sms} alt="Register using your mobile" className="max-w-xs mx-auto lg:max-w-sm" />
            <h1 className="text-4xl font-extrabold text-orange-900 mt-6 jost">Create a SaralSeva Account</h1>
            <p className="text-lg text-gray-600 dark:text-white mt-2">
              Already have an Account?{' '}
              <Link to='/userlogin' className="font-semibold text-orange-700 hover:underline">Log In</Link>
            </p>
          </div>
          
          {/* Right Side Form */}
          <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-2xl">

            {/* Google Sign-Up Button */}
            <div className="mb-6">
              <div className="mb-6">
                <div className="w-full [&>div]:!w-full [&>div>div]:!w-full [&_iframe]:!w-full">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      const id_token = credentialResponse.credential;
                      handleGoogleSignUp(id_token);
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

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or register with email
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name + Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className={labelClasses}>
                    Full Name *
                  </label>
                  <input 
                    id="name" 
                    type="text" 
                    placeholder="Enter your full name" 
                    {...register("name")}
                    className={`${inputClasses} ${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
                  {nameValue && !errors.name && (
                    <p className="text-green-600 text-sm mt-1">✓ Name looks good</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="gender" className={labelClasses}>
                    Gender *
                  </label>
                  <select 
                    id="gender"
                    {...register("gender")} 
                    className={`${inputClasses} ${errors.gender ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.gender && <p className={errorClasses}>{errors.gender.message}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClasses}>
                  Email Address *
                </label>
                <input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email address" 
                  {...register("email")}
                  className={`${inputClasses} ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
                {emailValue && !errors.email && (
                  <p className="text-green-600 text-sm mt-1">✓ Valid email address</p>
                )}
              </div>

              {/* Password + Toggle + Strength */}
              <div>
                <label htmlFor="password" className={labelClasses}>
                  Password *
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    {...register("password")}
                    className={`${inputClasses} ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-3" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeSlashIcon className="w-5 h-5 text-gray-600" /> : <EyeIcon className="w-5 h-5 text-gray-600" />}
                  </button>
                </div>
                {errors.password && <p className={errorClasses}>{errors.password.message}</p>}
                
                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Password Strength:</p>
                    <div className="text-sm grid grid-cols-2 gap-2">
                      <span className={getPasswordStrengthColor(passwordStrength.length)}>✓ 8+ characters</span>
                      <span className={getPasswordStrengthColor(passwordStrength.uppercase)}>✓ Uppercase letter</span>
                      <span className={getPasswordStrengthColor(passwordStrength.lowercase)}>✓ Lowercase letter</span>
                      <span className={getPasswordStrengthColor(passwordStrength.number)}>✓ Number</span>
                      <span className={getPasswordStrengthColor(passwordStrength.symbol)}>✓ Symbol</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className={labelClasses}>
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    {...register("confirmPassword")}
                    className={`${inputClasses} ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-3" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5 text-gray-600" /> : <EyeIcon className="w-5 h-5 text-gray-600" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className={errorClasses}>{errors.confirmPassword.message}</p>}
                {watch("confirmPassword") && watch("password") === watch("confirmPassword") && !errors.confirmPassword && (
                  <p className="text-green-600 text-sm mt-1">✓ Passwords match</p>
                )}
              </div>

              {/* Mobile + OTP */}
              <div>
                <label htmlFor="mobile" className={labelClasses}>
                  Mobile Number *
                </label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input 
                      id="mobile"
                      type="tel" 
                      placeholder="Enter your 10-digit mobile number" 
                      {...register("mobile")} 
                      className={`${inputClasses} ${errors.mobile ? 'border-red-500' : ''}`}
                    />
                    {errors.mobile && <p className={errorClasses}>{errors.mobile.message}</p>}
                    {watch("mobile") && watch("mobile").length === 10 && !errors.mobile && (
                      <p className="text-green-600 text-sm mt-1">✓ Valid mobile number</p>
                    )}
                  </div>
                  <Button 
                    type="button" 
                    onClick={() => handleSendOtp(watch("mobile"))} 
                    disabled={otpSent || loading || !watch("mobile") || watch("mobile").length !== 10}
                    className="whitespace-nowrap mt-1"
                  >
                    {otpSent ? "OTP Sent" : "Send OTP"}
                  </Button>
                </div>
              </div>

              {otpSent && !isPhoneVerified && (
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      placeholder="Enter 6-digit OTP" 
                      value={otp} 
                      onChange={(e) => setOtp(e.target.value)} 
                      className={inputClasses}
                      maxLength={6}
                    />
                  </div>
                  <Button 
                    type="button" 
                    onClick={() => handleVerifyOtp(watch("mobile"))} 
                    disabled={loading || !otp || otp.length !== 6}
                  >
                    Verify OTP
                  </Button>
                </div>
              )}

              {isPhoneVerified && (
                <p className="text-green-600 text-sm">✓ Phone number verified successfully</p>
              )}

              {/* Profile Picture */}
              <div>
                <label htmlFor="profilePicture" className={labelClasses}>
                  Profile Picture (Optional)
                </label>
                <input 
                  id="profilePicture"
                  type="file" 
                  {...register("profilePicture")} 
                  className={inputClasses}
                  accept="image/*"
                />
              </div>
              
              {/* Country + State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:text-black">
                <div>
                  <label className={labelClasses}>Country *</label>
                  <CountrySelect 
                    onChange={(e) => { 
                      setCountryid(e.id); 
                      setValue("country", e.name); 
                    }} 
                    placeHolder="Select Country"
                  />
                  {errors.country && <p className={errorClasses}>{errors.country.message}</p>}
                </div>
                <div>
                  <label className={labelClasses}>State *</label>
                  <StateSelect 
                    countryid={countryid} 
                    onChange={(e) => { 
                      setValue("state", e.name); 
                    }} 
                    placeHolder="Select State"
                  />
                  {errors.state && <p className={errorClasses}>{errors.state.message}</p>}
                </div>
              </div>

              <Button 
                className="w-full text-lg py-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-px transition-all" 
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;