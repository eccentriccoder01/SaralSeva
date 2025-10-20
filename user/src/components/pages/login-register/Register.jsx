import React, { useState } from "react";
import sms from "./../../../assets/register-sms.png";
import { Button } from "@/components/ui/button";
import { CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Link ,useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // 👁 for toggle
import { GoogleLogin } from "@react-oauth/google"; // Google OAuth
import DropdownSelect from "@/components/DropdownSelect";

// ✅ Schema with confirmPassword + refine
const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
  mobile: z.string().length(10, { message: "Mobile number must be 10 digits" }).regex(/^[0-9]+$/, { message: "Invalid mobile number" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]  
});

// Calculates how many of the 5 passwoord criteria are met
const getPasswordScore = (strength) => {
  return Object.values(strength).filter(Boolean).length;
};

const RegisterForm = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [countryid, setCountryid] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTypingPassword, setIsTypingPassword] = useState(false);

  
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
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const password = watch("password");

  // Track password strength
  React.useEffect(() => {
    if (password && password.length > 0) {
      setIsTypingPassword(true);
      setPasswordStrength({
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      });
    } else {
      setIsTypingPassword(false); // hide when password is empty
    }
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

  // ✅ Send OTP
  const handleSendOtp = async (mobile) => {
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

  // ✅ Verify OTP
  const handleVerifyOtp = async (mobile) => {
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
              {/* Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input id="name" type="text" placeholder="Enter your Name" {...register("name")} className={inputClasses}/>
                  {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
                </div>
                {/* Gender */}
                <div>
                  <DropdownSelect
                    options={["Male", "Female"]}
                    selectedOption={watch("gender") || "Select Gender"} 
                    onSelect={(value) => setValue("gender", value)}
                    className={inputClasses}
                    placeholder="Select Gender" 
                  />
                  {errors.gender && <p className={errorClasses}>{errors.gender.message}</p>}
                </div>
              </div>
               {/* Email */}
              <input id="email" type="text" placeholder="Enter your Email" {...register("email")} className={inputClasses} />
              {errors.email && <p className={errorClasses}>{errors.email.message}</p>}

              {/* Password + Toggle + Strength */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                   placeholder="Enter your Password"
                      {...register("password")}
                   className={inputClasses}
                />
              <button type="button" className="absolute right-3 top-3" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeSlashIcon className="w-5 h-5 text-gray-600" /> : <EyeIcon className="w-5 h-5 text-gray-600" />}
                </button>
              {errors.password && <p className={errorClasses}>{errors.password.message}</p>}
              {/* Password Strength Progress Bar + Label */}
              {isTypingPassword && (
                <div className="mt-3">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        getPasswordScore(passwordStrength) <= 2
                          ? "bg-red-500 w-1/5"
                          : getPasswordScore(passwordStrength) === 3
                          ? "bg-yellow-500 w-3/5"
                          : "bg-green-500 w-full"
                      }`}
                    />
                  </div>
                  <p className="text-sm mt-1 font-medium text-gray-700">
                    Strength: {
                      ["Too Weak", "Too Weak", "Weak", "Medium", "Strong"][getPasswordScore(passwordStrength)] || "Too Weak"
                    }
                  </p>
                </div>
              )}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your Password"
                  {...register("confirmPassword")}
                  className={inputClasses}
                />
                <button type="button" className="absolute right-3 top-3" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5 text-gray-600" /> : <EyeIcon className="w-5 h-5 text-gray-600" />}
                </button>
                {errors.confirmPassword && <p className={errorClasses}>{errors.confirmPassword.message}</p>}
              </div>

              {/* Mobile + OTP */}
              <div className="flex gap-2">
                <input
                  type="tel"
                  placeholder="Enter your Mobile Number"
                  {...register("mobile")}
                  className={`${inputClasses} flex-grow`} 
                />
              <Button
                type="button"
                onClick={() => handleSendOtp(watch("mobile"))}
                disabled={otpSent || loading}
                className="p-3 min-w-[100px] h-full whitespace-nowrap"
              >
                {otpSent ? "OTP Sent" : "Send OTP"}
              </Button>
              </div>
              {errors.mobile && <p className={errorClasses}>{errors.mobile.message}</p>}

              {otpSent && !isPhoneVerified && (
                <div className="flex gap-2">
                  <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className={inputClasses} />
                  <Button type="button" onClick={() => handleVerifyOtp(watch("mobile"))} disabled={loading}>
                    Verify OTP
                  </Button>
                </div>
              )}

              {/* Profile Picture */}
              {/* <input type="file" {...register("profilePicture")} className={inputClasses} /> */}
              
              {/* Country + State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:text-black">
                  <div>
                  <CountrySelect onChange={(e) => { setCountryid(e.id); setValue("country", e.name); }} placeHolder="Select Country" showFlag={false} />                    {errors.country && <p className={errorClasses}>{errors.country.message}</p>}
                    {errors.country && <p className={errorClasses}>{errors.country.message}</p>}
                  </div>
                  <div>
                    <StateSelect countryid={countryid} onChange={(e) => { setValue("state", e.name); }} placeHolder="Select State"/>
                    {errors.state && <p className={errorClasses}>{errors.state.message}</p>}
                  </div>
              </div>

              <Button className="w-full text-lg py-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-px transition-all" type="submit">
               {loading ? "Processing..." : "Create Account"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;