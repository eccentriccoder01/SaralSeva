import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import { ArrowLeft, User, Mail, Phone, MapPin, Globe, Shield, Save, CheckCircle, AlertCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  mobile: z.string()
    .length(10, { message: "Mobile number must be 10 digits" })
    .regex(/^[0-9]+$/, { message: "Invalid mobile number" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
});

const EditProfile = () => {
  const { user, id, getUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [countryId, setCountryId] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors, isDirty } } = useForm({
    resolver: zodResolver(schema),
  });

  const watchedFields = watch();

  useEffect(() => {
    if (user) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("gender", user.gender || "");
      setValue("mobile", String(user.mobile || ""));
      setValue("country", user.country || "");
      setValue("state", user.state || "");
      setCountryId(user.country || "");
    }
  }, [user, setValue]);

  const onSubmit = (data) => {
    setFormData(data);
    setConfirmModal(true);
  };

  const handleConfirmUpdate = async () => {
    setConfirmModal(false);
    setIsSubmitting(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/updateUser/${id}`,
        formData
      );
      if (res.data.success) {
        getUser(id);
        setSuccessModal(true);
      } else {
        alert(res.data.message || "Failed to update profile");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Styled input classes with dark mode support
  const inputClasses = (hasError, hasValue) =>
    `w-full p-4 border-2 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all duration-500 text-lg font-medium
    dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400
    ${hasError 
      ? 'border-red-300 bg-red-50/50 focus:bg-white dark:bg-red-900/20 dark:border-red-700 dark:focus:bg-gray-800 shadow-sm' 
      : hasValue
      ? 'border-green-200 bg-green-50/30 focus:bg-white dark:bg-green-900/20 dark:border-green-700 dark:focus:bg-gray-800 shadow-sm'
      : 'border-gray-200 bg-white/80 hover:bg-white focus:bg-white dark:bg-gray-800 dark:hover:bg-gray-750 dark:focus:bg-gray-800 shadow-sm hover:shadow-md dark:shadow-gray-900'
    }`;

  const labelClasses = "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider";

  const errorClasses = "text-red-600 dark:text-red-400 text-sm mt-2 flex items-center gap-2 font-medium";

  const successClasses = "text-green-600 dark:text-green-400 text-sm mt-2 flex items-center gap-2 font-medium";

  // Custom dropdown wrapper classes with dark mode
  const dropdownWrapperClasses = (hasError, hasValue) =>
    `w-full border-2 rounded-2xl focus-within:ring-4 focus-within:ring-orange-500/20 focus-within:border-orange-500 outline-none transition-all duration-500
    dark:bg-gray-800 dark:border-gray-600
    ${hasError 
      ? 'border-red-300 bg-red-50/50 focus-within:bg-white dark:bg-red-900/20 dark:border-red-700 dark:focus-within:bg-gray-800 shadow-sm' 
      : hasValue
      ? 'border-green-200 bg-green-50/30 focus-within:bg-white dark:bg-green-900/20 dark:border-green-700 dark:focus-within:bg-gray-800 shadow-sm'
      : 'border-gray-200 bg-white/80 hover:bg-white focus-within:bg-white dark:bg-gray-800 dark:hover:bg-gray-750 dark:focus-within:bg-gray-800 shadow-sm hover:shadow-md dark:shadow-gray-900'
    }`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200/20 dark:bg-orange-900/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200/20 dark:bg-amber-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Premium Header */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl dark:shadow-gray-900 p-8 mb-8 border border-white/20 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => navigate(-1)}
                className="group w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white hover:from-orange-600 hover:to-amber-600 transition-all duration-500 hover:scale-110 shadow-lg hover:shadow-xl"
              >
                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Edit Profile
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">Update your personal information securely</p>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {Object.values(watchedFields).filter(val => val && val.toString().length > 0).length}/6
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Fields Completed</div>
              </div>
              <div className="w-2 h-2 bg-orange-500 dark:bg-orange-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Sidebar - Quick Tips */}
          <div className="xl:col-span-1 space-y-6">
            {/* Profile Completion */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl dark:shadow-gray-900 p-6 border border-white/20 dark:border-gray-700/50">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-green-500 dark:text-green-400" />
                Profile Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Completion</span>
                  <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                    {Math.round((Object.values(watchedFields).filter(val => val && val.toString().length > 0).length / 6) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(Object.values(watchedFields).filter(val => val && val.toString().length > 0).length / 6) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl shadow-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Shield size={20} />
                Quick Tips
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Use your legal name as per documents
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Ensure mobile number is active
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Select correct location for schemes
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  All information is encrypted
                </li>
              </ul>
            </div>

            {/* Security Badge */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl dark:shadow-gray-900 p-6 border border-white/20 dark:border-gray-700/50">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield size={32} className="text-white" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Bank-Level Security</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your data is protected with 256-bit encryption</p>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl dark:shadow-gray-900 p-8 border border-white/20 dark:border-gray-700/50">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Personal Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <User size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Personal Information</h3>
                      <p className="text-gray-600 dark:text-gray-400">Your identity details</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div data-tooltip-id="name-tooltip" data-tooltip-content="Enter your full name as per official documents">
                      <label className={labelClasses}>
                        Full Name *
                      </label>
                      <div className="relative">
                        <input 
                          {...register("name")} 
                          placeholder="John Doe"
                          className={inputClasses(errors.name, watchedFields.name)}
                        />
                        {watchedFields.name && !errors.name && (
                          <CheckCircle size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 dark:text-green-400" />
                        )}
                      </div>
                      {errors.name ? (
                        <p className={errorClasses}>
                          <AlertCircle size={16} />
                          {errors.name.message}
                        </p>
                      ) : watchedFields.name && (
                        <p className={successClasses}>
                          <CheckCircle size={16} />
                          Name looks good!
                        </p>
                      )}
                    </div>

                    {/* Gender */}
                    <div data-tooltip-id="gender-tooltip" data-tooltip-content="Select your gender for personalized services">
                      <label className={labelClasses}>
                        Gender *
                      </label>
                      <div className="relative">
                        <select 
                          {...register("gender")} 
                          className={inputClasses(errors.gender, watchedFields.gender)}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        {watchedFields.gender && !errors.gender && (
                          <CheckCircle size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 dark:text-green-400" />
                        )}
                      </div>
                      {errors.gender && (
                        <p className={errorClasses}>
                          <AlertCircle size={16} />
                          {errors.gender.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div data-tooltip-id="email-tooltip" data-tooltip-content="This email will be used for official communications">
                      <label className={labelClasses}>
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        <input 
                          {...register("email")} 
                          placeholder="john.doe@example.com"
                          className={`${inputClasses(errors.email, watchedFields.email)} pl-12`}
                        />
                        {watchedFields.email && !errors.email && (
                          <CheckCircle size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 dark:text-green-400" />
                        )}
                      </div>
                      {errors.email ? (
                        <p className={errorClasses}>
                          <AlertCircle size={16} />
                          {errors.email.message}
                        </p>
                      ) : watchedFields.email && (
                        <p className={successClasses}>
                          <CheckCircle size={16} />
                          Valid email format
                        </p>
                      )}
                    </div>

                    {/* Mobile */}
                    <div data-tooltip-id="mobile-tooltip" data-tooltip-content="10-digit mobile number for SMS notifications">
                      <label className={labelClasses}>
                        Mobile Number *
                      </label>
                      <div className="relative">
                        <Phone size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        <input 
                          {...register("mobile")} 
                          placeholder="9876543210"
                          className={`${inputClasses(errors.mobile, watchedFields.mobile)} pl-12`}
                        />
                        {watchedFields.mobile && !errors.mobile && (
                          <CheckCircle size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 dark:text-green-400" />
                        )}
                      </div>
                      {errors.mobile ? (
                        <p className={errorClasses}>
                          <AlertCircle size={16} />
                          {errors.mobile.message}
                        </p>
                      ) : watchedFields.mobile && (
                        <p className={successClasses}>
                          <CheckCircle size={16} />
                          Valid mobile number
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location Information Section */}
                <div className="space-y-6 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <MapPin size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Location Information</h3>
                      <p className="text-gray-600 dark:text-gray-400">For regional scheme eligibility</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Country */}
                    <div data-tooltip-id="country-tooltip" data-tooltip-content="Select your country for regional services">
                      <label className={labelClasses}>
                        Country *
                      </label>
                      <div className="relative">
                        <Globe size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 z-10" />
                        <div className={`${dropdownWrapperClasses(errors.country, watchedFields.country)} country-select-wrapper`}>
                          <CountrySelect
                            placeHolder={user?.country || "Select Country"}
                            value=""
                            className="country-select-input"
                            onChange={(e) => {
                              setCountryId(e.id);
                              setValue("country", e.name, { shouldValidate: true });
                            }}
                          />
                        </div>
                        {watchedFields.country && !errors.country && (
                          <CheckCircle size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 dark:text-green-400" />
                        )}
                      </div>
                      {errors.country && (
                        <p className={errorClasses}>
                          <AlertCircle size={16} />
                          {errors.country.message}
                        </p>
                      )}
                    </div>

                    {/* State */}
                    <div data-tooltip-id="state-tooltip" data-tooltip-content="Select your state for local government schemes">
                      <label className={labelClasses}>
                        State/Region *
                      </label>
                      <div className="relative">
                        <MapPin size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 z-10" />
                        <div className={`${dropdownWrapperClasses(errors.state, watchedFields.state)} state-select-wrapper`}>
                          <StateSelect
                            countryid={countryId}
                            placeHolder={user?.state || "Select State"}
                            value=""
                            className="state-select-input"
                            onChange={(e) => setValue("state", e.name, { shouldValidate: true })}
                          />
                        </div>
                        {watchedFields.state && !errors.state && (
                          <CheckCircle size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 dark:text-green-400" />
                        )}
                      </div>
                      {errors.state && (
                        <p className={errorClasses}>
                          <AlertCircle size={16} />
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-5 rounded-2xl transition-all duration-500 border-2 border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-400 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={20} />
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting || !isDirty}
                    className="flex-1 gap-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:from-gray-400 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-600 text-white font-bold py-5 rounded-2xl transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center disabled:cursor-not-allowed group"
                    data-tooltip-id="update-tooltip"
                    data-tooltip-content={!isDirty ? "No changes made to update" : "Save all changes to your profile"}
                  >
                    <Save size={24} className="group-hover:scale-110 transition-transform" />
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Updating...
                      </div>
                    ) : (
                      "Update Profile"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltips */}
      {["name", "email", "gender", "mobile", "country", "state", "update"].map(id => (
        <Tooltip
          key={id}
          id={`${id}-tooltip`}
          className="max-w-xs bg-gray-900 dark:bg-gray-700 text-white p-3 rounded-xl shadow-2xl text-center z-50 backdrop-blur-sm"
          place="top"
        />
      ))}

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-md w-full mx-4 text-center animate-modalIn">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Save size={36} className="text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Confirm Changes</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Are you sure you want to update your profile information?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setConfirmModal(false)}
                className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpdate}
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-md w-full mx-4 text-center animate-modalIn">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle size={36} className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Profile Updated!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Your profile has been successfully updated with the new information.
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              View Profile
            </button>
          </div>
        </div>
      )}

      {/* Custom Styles for Dropdowns with Dark Mode */}
      <style jsx global>{`
        .animate-modalIn {
          animation: modalIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.7) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Custom classes for better targeting */
        .country-select-input,
        .state-select-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          background: transparent;
          outline: none;
          border: none;
          font-size: 1.125rem;
          font-weight: 500;
          color: #1f2937;
        }

        .dark .country-select-input,
        .dark .state-select-input {
          color: #f3f4f6;
        }

        .country-select-input::placeholder,
        .state-select-input::placeholder {
          color: #9ca3af;
        }

        .dark .country-select-input::placeholder,
        .dark .state-select-input::placeholder {
          color: #6b7280;
        }

        /* CRITICAL FIX: Ensure dropdown menus are visible and properly positioned */
        .country-select-wrapper,
        .state-select-wrapper {
          position: relative;
        }

        /* Fix for react-country-state-city dropdown container */
        .country-select-wrapper .react-country-state-city,
        .state-select-wrapper .react-country-state-city {
          position: relative;
          width: 100%;
        }

        /* Ensure the dropdown menu appears above other elements */
        .country-select-wrapper .react-country-state-city .select__menu,
        .state-select-wrapper .react-country-state-city .select__menu {
          position: absolute !important;
          top: 100% !important;
          left: 0 !important;
          right: 0 !important;
          z-index: 9999 !important;
          margin-top: 4px !important;
          border-radius: 1rem !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
          border: 1px solid #e5e7eb !important;
          background: white !important;
          overflow: hidden;
        }

        .dark .country-select-wrapper .react-country-state-city .select__menu,
        .dark .state-select-wrapper .react-country-state-city .select__menu {
          background: #374151 !important;
          border: 1px solid #4b5563 !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4) !important;
        }

        /* Ensure menu list is visible */
        .country-select-wrapper .react-country-state-city .select__menu-list,
        .state-select-wrapper .react-country-state-city .select__menu-list {
          max-height: 200px !important;
          border-radius: 1rem !important;
          padding: 4px !important;
        }

        /* Fix for react-country-state-city dropdowns */
        .country-select-wrapper .react-country-state-city .select__control,
        .state-select-wrapper .react-country-state-city .select__control {
          border: none !important;
          background: transparent !important;
          box-shadow: none !important;
          min-height: auto !important;
          font-size: 1.125rem !important;
          font-weight: 500 !important;
          cursor: pointer !important;
          padding: 0 !important;
        }

        .country-select-wrapper .react-country-state-city .select__value-container,
        .state-select-wrapper .react-country-state-city .select__value-container {
          padding: 0 !important;
          height: auto !important;
        }

        .country-select-wrapper .react-country-state-city .select__input,
        .state-select-wrapper .react-country-state-city .select__input {
          color: inherit !important;
          font-size: 1.125rem !important;
          font-weight: 500 !important;
        }

        .country-select-wrapper .react-country-state-city .select__single-value,
        .state-select-wrapper .react-country-state-city .select__single-value {
          color: #1f2937 !important;
          font-size: 1.125rem !important;
          font-weight: 500 !important;
          margin-left: 0 !important;
        }

        .dark .country-select-wrapper .react-country-state-city .select__single-value,
        .dark .state-select-wrapper .react-country-state-city .select__single-value {
          color: #f3f4f6 !important;
        }

        .country-select-wrapper .react-country-state-city .select__placeholder,
        .state-select-wrapper .react-country-state-city .select__placeholder {
          color: #9ca3af !important;
          font-size: 1.125rem !important;
          font-weight: 500 !important;
          margin-left: 0 !important;
        }

        .dark .country-select-wrapper .react-country-state-city .select__placeholder,
        .dark .state-select-wrapper .react-country-state-city .select__placeholder {
          color: #6b7280 !important;
        }

        /* Dropdown Options */
        .country-select-wrapper .react-country-state-city .select__option,
        .state-select-wrapper .react-country-state-city .select__option {
          padding: 12px 16px !important;
          font-size: 1rem !important;
          cursor: pointer !important;
          background: white !important;
          color: #1f2937 !important;
        }

        .dark .country-select-wrapper .react-country-state-city .select__option,
        .dark .state-select-wrapper .react-country-state-city .select__option {
          background: #374151 !important;
          color: #f3f4f6 !important;
        }

        .country-select-wrapper .react-country-state-city .select__option--is-focused,
        .state-select-wrapper .react-country-state-city .select__option--is-focused {
          background-color: #fed7aa !important;
          color: #1f2937 !important;
        }

        .dark .country-select-wrapper .react-country-state-city .select__option--is-focused,
        .dark .state-select-wrapper .react-country-state-city .select__option--is-focused {
          background-color: #7c2d12 !important;
          color: #f3f4f6 !important;
        }

        .country-select-wrapper .react-country-state-city .select__option--is-selected,
        .state-select-wrapper .react-country-state-city .select__option--is-selected {
          background-color: #f97316 !important;
          color: white !important;
        }

        .dark .country-select-wrapper .react-country-state-city .select__option--is-selected,
        .dark .state-select-wrapper .react-country-state-city .select__option--is-selected {
          background-color: #ea580c !important;
          color: white !important;
        }

        /* Dropdown Indicators */
        .country-select-wrapper .react-country-state-city .select__indicator,
        .state-select-wrapper .react-country-state-city .select__indicator {
          padding: 0 12px !important;
          color: #6b7280 !important;
        }

        .dark .country-select-wrapper .react-country-state-city .select__indicator,
        .dark .state-select-wrapper .react-country-state-city .select__indicator {
          color: #9ca3af !important;
        }

        .country-select-wrapper .react-country-state-city .select__indicator:hover,
        .state-select-wrapper .react-country-state-city .select__indicator:hover {
          color: #374151 !important;
        }

        .dark .country-select-wrapper .react-country-state-city .select__indicator:hover,
        .dark .state-select-wrapper .react-country-state-city .select__indicator:hover {
          color: #d1d5db !important;
        }

        .country-select-wrapper .react-country-state-city .select__dropdown-indicator,
        .state-select-wrapper .react-country-state-city .select__dropdown-indicator {
          padding: 0 !important;
        }

        /* Fix for the dropdown arrow icon */
        .country-select-wrapper .react-country-state-city .select__indicator svg,
        .state-select-wrapper .react-country-state-city .select__indicator svg {
          fill: #6b7280 !important;
        }

        .dark .country-select-wrapper .react-country-state-city .select__indicator svg,
        .dark .state-select-wrapper .react-country-state-city .select__indicator svg {
          fill: #9ca3af !important;
        }

        /* Remove any potential overflow hidden that might hide the dropdown */
        .country-select-wrapper .react-country-state-city .select__menu {
          overflow: visible !important;
        }

        .country-select-wrapper .react-country-state-city .select__menu-list {
          overflow-y: auto !important;
        }
      `}</style>
    </div>
  );
};

export default EditProfile;