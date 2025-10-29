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
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { GoogleLogin } from "@react-oauth/google";
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

// Calculates how many of the 5 password criteria are met
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
    return condition ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-gray-500";
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
      setIsTypingPassword(false);
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
        setTimeout(() => navigate("/userlogin"), 2000);
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
  
  const inputClasses = "w-full p-3 border rounded-md transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400";
  const errorClasses = "text-red-600 dark:text-red-400 text-sm mt-1";

  return (
    <div className="min-h-[70vh] py-10 bg-orange-50/30 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
      <Toaster position="top-center" richColors />
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
          <div className="text-center lg:text-left lg:w-1/3">
            <img 
              src={sms} 
              alt="Register using your mobile" 
              className="max-w-xs mx-auto lg:max-w-sm dark:brightness-90 dark:contrast-110" 
            />
            <h1 className="text-4xl font-extrabold text-orange-900 dark:text-orange-400 mt-6 jost transition-colors duration-300">
              Create a SaralSeva Account
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 transition-colors duration-300">
              Already have an Account?{' '}
              <Link to='/userlogin' className="font-semibold text-orange-700 dark:text-orange-400 hover:underline">
                Log In
              </Link>
            </p>
          </div>

          {/* Right Side Form */}
          <div className="w-full max-w-lg p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-black/50 transition-colors duration-300">

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
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    Or register with email
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name & Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input 
                    id="name" 
                    type="text" 
                    placeholder="Enter your Name" 
                    {...register("name")} 
                    className={inputClasses}
                  />
                  {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
                </div>
                <div className="gender-dropdown-wrapper">
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
              <input 
                id="email" 
                type="text" 
                placeholder="Enter your Email" 
                {...register("email")} 
                className={inputClasses} 
              />
              {errors.email && <p className={errorClasses}>{errors.email.message}</p>}

              {/* Password + Toggle + Strength */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  {...register("password")}
                  className={inputClasses}
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-3" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 
                    <EyeSlashIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" /> : 
                    <EyeIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  }
                </button>
                {errors.password && <p className={errorClasses}>{errors.password.message}</p>}
                
                {/* Password Strength Progress Bar + Label */}
                {isTypingPassword && (
                  <div className="mt-3">
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
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
                    <p className="text-sm mt-1 font-medium text-gray-700 dark:text-gray-300">
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
                <button 
                  type="button" 
                  className="absolute right-3 top-3" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 
                    <EyeSlashIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" /> : 
                    <EyeIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  }
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
                  <input 
                    type="text" 
                    placeholder="Enter OTP" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                    className={inputClasses} 
                  />
                  <Button 
                    type="button" 
                    onClick={() => handleVerifyOtp(watch("mobile"))} 
                    disabled={loading}
                  >
                    Verify OTP
                  </Button>
                </div>
              )}

              {/* Country + State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="country-select-wrapper">
                  <CountrySelect 
                    onChange={(e) => { 
                      setCountryid(e.id); 
                      setValue("country", e.name); 
                    }} 
                    placeHolder="Select Country" 
                    showFlag={false} 
                  />
                  {errors.country && <p className={errorClasses}>{errors.country.message}</p>}
                </div>
                <div className="state-select-wrapper">
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
              >
                {loading ? "Processing..." : "Create Account"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Dark Mode Styles for Dropdowns */}
      <style>{`
        /* Gender Dropdown Dark Mode Styling - Match input fields exactly */
        .gender-dropdown-wrapper {
          position: relative;
          width: 100%;
        }

        /* Remove all borders and shadows from wrapper elements */
        .gender-dropdown-wrapper > *,
        .gender-dropdown-wrapper > div,
        .gender-dropdown-wrapper > div > * {
          box-shadow: none !important;
        }

        /* Style the actual button/trigger to match input fields */
        .gender-dropdown-wrapper button,
        .gender-dropdown-wrapper [role="button"],
        .gender-dropdown-wrapper > div > button,
        .gender-dropdown-wrapper > div > div {
          width: 100% !important;
          padding: 0.75rem !important;
          border: 1px solid #d1d5db !important;
          border-radius: 0.375rem !important;
          background-color: white !important;
          color: #111827 !important;
          font-size: 1rem !important;
          line-height: 1.5rem !important;
          text-align: left !important;
          transition: all 0.3s !important;
        }

        /* Dark mode button styling */
        :is(.dark) .gender-dropdown-wrapper button,
        :is(.dark) .gender-dropdown-wrapper [role="button"],
        :is(.dark) .gender-dropdown-wrapper > div > button,
        :is(.dark) .gender-dropdown-wrapper > div > div {
          background-color: #374151 !important;
          color: #f3f4f6 !important;
          border: 1px solid #4b5563 !important;
        }

        /* Focus state */
        .gender-dropdown-wrapper button:focus,
        .gender-dropdown-wrapper [role="button"]:focus {
          outline: none !important;
          ring: 2px !important;
          ring-color: #f59e0b !important;
          border-color: #f59e0b !important;
        }

        :is(.dark) .gender-dropdown-wrapper button:focus,
        :is(.dark) .gender-dropdown-wrapper [role="button"]:focus {
          ring: 2px !important;
          ring-color: #f59e0b !important;
          border-color: #f59e0b !important;
        }

        /* Dropdown menu */
        :is(.dark) .gender-dropdown-wrapper [role="menu"],
        :is(.dark) .gender-dropdown-wrapper [role="listbox"],
        :is(.dark) .gender-dropdown-wrapper ul {
          background-color: #374151 !important;
          border: 1px solid #4b5563 !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5) !important;
          border-radius: 0.375rem !important;
          margin-top: 0.25rem !important;
        }

        /* Menu items */
        :is(.dark) .gender-dropdown-wrapper [role="menuitem"],
        :is(.dark) .gender-dropdown-wrapper [role="option"],
        :is(.dark) .gender-dropdown-wrapper li {
          background-color: #374151 !important;
          color: #f3f4f6 !important;
          padding: 0.5rem 0.75rem !important;
        }

        :is(.dark) .gender-dropdown-wrapper [role="menuitem"]:hover,
        :is(.dark) .gender-dropdown-wrapper [role="option"]:hover,
        :is(.dark) .gender-dropdown-wrapper li:hover {
          background-color: #4b5563 !important;
          color: #ffffff !important;
        }

        :is(.dark) .gender-dropdown-wrapper [aria-selected="true"],
        :is(.dark) .gender-dropdown-wrapper .selected {
          background-color: #d97706 !important;
          color: #ffffff !important;
        }

        /* Country/State select dark mode styling */
        .country-select-wrapper,
        .state-select-wrapper {
          border-radius: 0.375rem;
        }

        .country-select-wrapper > div,
        .state-select-wrapper > div {
          border-radius: 0.375rem !important;
        }

        .country-select-wrapper input,
        .state-select-wrapper input {
          padding: 0.75rem !important;
          height: auto !important;
          min-height: 48px;
        }

        :is(.dark) .country-select-wrapper,
        :is(.dark) .state-select-wrapper {
          background-color: #374151 !important;
          border-radius: 0.375rem;
          border: 1px solid #4b5563;
        }

        :is(.dark) .country-select-wrapper input,
        :is(.dark) .state-select-wrapper input,
        :is(.dark) .country-select-wrapper select,
        :is(.dark) .state-select-wrapper select {
          background-color: #374151 !important;
          color: #f3f4f6 !important;
          border-color: #4b5563 !important;
        }

        :is(.dark) .csc-dropdown,
        :is(.dark) .csc-menu,
        :is(.dark) [class*="dropdown"],
        :is(.dark) [class*="menu"],
        :is(.dark) ul[role="listbox"],
        :is(.dark) div[role="listbox"] {
          background-color: #374151 !important;
          border: 1px solid #4b5563 !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5) !important;
        }

        :is(.dark) .csc-option,
        :is(.dark) [class*="option"],
        :is(.dark) li[role="option"],
        :is(.dark) div[role="option"] {
          background-color: #374151 !important;
          color: #f3f4f6 !important;
        }

        :is(.dark) .csc-option:hover,
        :is(.dark) [class*="option"]:hover,
        :is(.dark) li[role="option"]:hover,
        :is(.dark) div[role="option"]:hover {
          background-color: #4b5563 !important;
          color: #ffffff !important;
        }

        :is(.dark) .csc-option.selected,
        :is(.dark) [class*="option"][class*="selected"],
        :is(.dark) li[role="option"][aria-selected="true"],
        :is(.dark) div[role="option"][aria-selected="true"] {
          background-color: #d97706 !important;
          color: #ffffff !important;
        }

        :is(.dark) .country-select-wrapper ul,
        :is(.dark) .state-select-wrapper ul {
          background-color: #374151 !important;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        :is(.dark) .country-select-wrapper li,
        :is(.dark) .state-select-wrapper li {
          background-color: #374151 !important;
          color: #f3f4f6 !important;
          padding: 8px 12px;
          cursor: pointer;
        }

        :is(.dark) .country-select-wrapper li:hover,
        :is(.dark) .state-select-wrapper li:hover {
          background-color: #4b5563 !important;
          color: #ffffff !important;
        }
      `}</style>
    </div>
  );
};

export default RegisterForm;