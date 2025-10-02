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
import { FaArrowLeft } from "react-icons/fa";

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

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

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
    // Show pre-update confirmation modal
    setFormData(data);
    setConfirmModal(true);
  };

  const handleConfirmUpdate = async () => {
    setConfirmModal(false);
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
    }
  };

  const inputClasses = "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 outline-none";
  const errorClasses = "text-red-600 text-sm mt-1";

  return (
    <div className="relative max-w-xl mx-auto mt-16">
      <FaArrowLeft
        onClick={() => navigate(-1)}
        title="Go Back"
        className="absolute top-6 left-4 text-3xl text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 cursor-pointer transition-colors z-20"
      />

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg relative">
        <h1 className="text-2xl font-bold mb-4 ml-8">Edit Profile</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative" data-tooltip-id="name-tooltip" data-tooltip-content="Enter your full name">
            <input {...register("name")} placeholder="Name" className={inputClasses} />
          </div>
          {errors.name && <p className={errorClasses}>{errors.name.message}</p>}

          <div className="relative" data-tooltip-id="email-tooltip" data-tooltip-content="Enter a valid email address">
            <input {...register("email")} placeholder="Email" className={inputClasses} />
          </div>
          {errors.email && <p className={errorClasses}>{errors.email.message}</p>}

          <div className="relative" data-tooltip-id="gender-tooltip" data-tooltip-content="Select your gender">
            <select {...register("gender")} className={inputClasses}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {errors.gender && <p className={errorClasses}>{errors.gender.message}</p>}

          <div className="relative" data-tooltip-id="mobile-tooltip" data-tooltip-content="Enter 10-digit mobile number">
            <input {...register("mobile")} placeholder="Mobile" className={inputClasses} />
          </div>
          {errors.mobile && <p className={errorClasses}>{errors.mobile.message}</p>}

          <div className="relative" data-tooltip-id="country-tooltip" data-tooltip-content="Select your country">
            <CountrySelect
              placeHolder={user?.country || "Select Country"}
              value=""
              onChange={(e) => {
                setCountryId(e.id);
                setValue("country", e.name);
              }}
            />
          </div>
          {errors.country && <p className={errorClasses}>{errors.country.message}</p>}

          <div className="relative" data-tooltip-id="state-tooltip" data-tooltip-content="Select your state">
            <StateSelect
              countryid={countryId}
              placeHolder={user?.state || "Select State"}
              value=""
              onChange={(e) => setValue("state", e.name)}
            />
          </div>
          {errors.state && <p className={errorClasses}>{errors.state.message}</p>}

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg"
            data-tooltip-id="update-tooltip"
            data-tooltip-content="Click to update your profile information"
          >
            Update Profile
          </button>
        </form>

        {/* Tooltips */}
        <Tooltip id="name-tooltip" className="max-w-xs bg-orange-900 text-white p-2 rounded-lg shadow-lg text-center" multiline />
        <Tooltip id="email-tooltip" className="max-w-xs bg-orange-900 text-white p-2 rounded-lg shadow-lg text-center" multiline />
        <Tooltip id="gender-tooltip" className="max-w-xs bg-orange-900 text-white p-2 rounded-lg shadow-lg text-center" multiline />
        <Tooltip id="mobile-tooltip" className="max-w-xs bg-orange-900 text-white p-2 rounded-lg shadow-lg text-center" multiline />
        <Tooltip id="country-tooltip" className="max-w-xs bg-orange-900 text-white p-2 rounded-lg shadow-lg text-center" multiline />
        <Tooltip id="state-tooltip" className="max-w-xs bg-orange-900 text-white p-2 rounded-lg shadow-lg text-center" multiline />
        <Tooltip id="update-tooltip" className="max-w-xs bg-orange-900 text-white p-2 rounded-lg shadow-lg text-center" multiline />
      </div>

      {/* Pre-Update Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-sm text-center animate-fadeIn">
            <p className="mb-4 font-semibold text-gray-800 dark:text-gray-100">
              Are you sure you want to update your profile?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmUpdate}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-bold"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-bold"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post-Update Success Modal */}
      {successModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-sm text-center animate-fadeIn">
            <p className="mb-4 font-semibold text-gray-800 dark:text-gray-100">
              Profile updated successfully!
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-bold"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default EditProfile;
