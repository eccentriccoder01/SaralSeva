import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import sms from "./../../../assets/register-sms.png";

const schema = z.object({
  mobile: z
    .string()
    .length(10, { message: "Mobile number must be 10 digits" })
    .regex(/^[0-9]+$/, { message: "Invalid mobile number" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
});

const CompleteGoogleRegistration = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, googleId } = location.state || {};

  const [countryid, setCountryid] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Send OTP (keeping it optional like in RegisterForm)
  const handleSendOtp = async () => {
    const mobile = watch("mobile");
    if (!mobile || mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/employee/send-otp`,
        { phone: mobile }
      );
      toast.success("OTP sent successfully!");
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    const mobile = watch("mobile");
    try {
      setIsLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/employee/verify-otp`,
        { phone: mobile, otp }
      );
      toast.success("Phone number verified!");
      setIsPhoneVerified(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    if (!isPhoneVerified && otpSent) {
      toast.warning("Phone number not verified via OTP (optional)", {
        style: { background: "#92400E", color: "white", border: "none" },
      });
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/google/complete`,
        {
          googleId,
          ...data,
        }
      );

      if (res.data.success) {
        toast.success("User registered successfully!", {
          style: { background: "#166534", color: "white", border: "none" },
        });
        // Optionally redirect to login or dashboard
        setTimeout(() => navigate("/userlogin"), 2000);
      } else {
        setError(res.data.message || "Registration completion failed.");
        toast.error(res.data.message || "Registration completion failed.", {
          style: { background: "#991B1B", color: "white", border: "none" },
        });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred.";
      setError(errorMessage);
      toast.error(errorMessage, {
        style: { background: "#991B1B", color: "white", border: "none" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if no user data
  if (!user || !googleId) {
    navigate("/login");
    return null;
  }

  const inputClasses =
    "dark:text-black w-full p-3 border border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none";
  const errorClasses = "text-red-600 text-sm mt-1";

  return (
    <div className="min-h-[70vh] py-10 bg-orange-50/30 flex items-center justify-center">
      <Toaster position="top-center" richColors />
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
          {/* Left Side - Image and Text */}
          <div className="text-center lg:text-left lg:w-1/3">
            <img
              src={sms}
              alt="Complete your registration"
              className="max-w-xs mx-auto lg:max-w-sm"
            />
            <h1 className="text-4xl font-extrabold text-orange-900 mt-6 jost">
              Complete Your Profile
            </h1>
            <p className="text-lg text-gray-600 dark:text-white mt-2">
              Welcome, {user.name}! Please complete your registration to get
              started.
            </p>
          </div>

          {/* Right Side Form */}
          <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-2xl">
            {/* Welcome Message */}
            <div className="mb-6 text-center">
              <div className="flex items-center justify-center gap-1 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Almost Done!
                  </h2>
                  <p className="ml-1 text-sm text-gray-600">
                    Just a few more details
                  </p>
                </div>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Complete your profile
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Gender */}
              <div>
                <select {...register("gender")} className={inputClasses}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p className={errorClasses}>{errors.gender.message}</p>
                )}
              </div>

              {/* Mobile + OTP Section */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="tel"
                      placeholder="Enter your Mobile Number"
                      {...register("mobile")}
                      className={inputClasses}
                    />
                    {errors.mobile && (
                      <p className={errorClasses}>{errors.mobile.message}</p>
                    )}
                  </div>
                  <Button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpSent || isLoading}
                    className="whitespace-nowrap"
                  >
                    {otpSent ? "OTP Sent" : "Send OTP"}
                  </Button>
                </div>

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
                      onClick={handleVerifyOtp}
                      disabled={isLoading}
                      className="whitespace-nowrap"
                    >
                      Verify OTP
                    </Button>
                  </div>
                )}

                {isPhoneVerified && (
                  <p className="text-green-600 text-sm flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Phone number verified
                  </p>
                )}
              </div>

              {/* Profile Picture */}
              <div>
                <input
                  type="file"
                  {...register("profilePicture")}
                  className={inputClasses}
                  accept="image/*"
                />
              </div>

              {/* Country + State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:text-black">
                <div>
                  <CountrySelect
                    onChange={(e) => {
                      setCountryid(e.id);
                      setValue("country", e.name);
                    }}
                    placeHolder="Select Country"
                  />
                  {errors.country && (
                    <p className={errorClasses}>{errors.country.message}</p>
                  )}
                </div>
                <div>
                  <StateSelect
                    countryid={countryid}
                    onChange={(e) => {
                      setValue("state", e.name);
                    }}
                    placeHolder="Select State"
                  />
                  {errors.state && (
                    <p className={errorClasses}>{errors.state.message}</p>
                  )}
                </div>
              </div>

              <Button
                className="w-full text-lg py-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-px transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Completing Registration...
                  </div>
                ) : (
                  "Complete Registration"
                )}
              </Button>
            </form>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-center text-red-600 font-medium text-sm">
                  {error}
                </p>
              </div>
            )}

            {/* User info display */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-semibold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteGoogleRegistration;
