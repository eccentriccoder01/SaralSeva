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

  // Input field classes
  const inputClasses =
    "w-full p-3 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none transition-colors " +
    "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 " +
    "placeholder-gray-400 dark:placeholder-gray-400";

  const errorClasses = "text-red-600 dark:text-red-400 text-sm mt-1";

  return (
    <div className="relative max-w-xl mx-auto mt-16">
      <FaArrowLeft
        onClick={() => navigate(-1)}
        title="Go Back"
        className="absolute top-6 left-4 text-3xl text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 cursor-pointer transition-colors z-20"
      />

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg relative">
        <h1 className="text-2xl font-bold mb-4 ml-8 text-gray-800 dark:text-gray-100">Edit Profile</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="relative" data-tooltip-id="name-tooltip" data-tooltip-content="Enter your full name">
            <input {...register("name")} placeholder="Name" className={inputClasses} />
          </div>
          {errors.name && <p className={errorClasses}>{errors.name.message}</p>}

          {/* Email */}
          <div className="relative" data-tooltip-id="email-tooltip" data-tooltip-content="Enter a valid email address">
            <input {...register("email")} placeholder="Email" className={inputClasses} />
          </div>
          {errors.email && <p className={errorClasses}>{errors.email.message}</p>}

          {/* Gender */}
          <div className="relative" data-tooltip-id="gender-tooltip" data-tooltip-content="Select your gender">
            <div className="relative">
              <select {...register("gender")} className={`${inputClasses} appearance-none cursor-pointer pr-10`}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          {errors.gender && <p className={errorClasses}>{errors.gender.message}</p>}

          {/* Mobile */}
          <div className="relative" data-tooltip-id="mobile-tooltip" data-tooltip-content="Enter 10-digit mobile number">
            <input {...register("mobile")} placeholder="Mobile" className={inputClasses} />
          </div>
          {errors.mobile && <p className={errorClasses}>{errors.mobile.message}</p>}

          {/* Country */}
          <div className="relative" data-tooltip-id="country-tooltip" data-tooltip-content="Select your country">
            <div className="country-select-wrapper">
              <CountrySelect
                placeHolder={user?.country || "Select Country"}
                value=""
                showFlag={false}
                onChange={(e) => {
                  setCountryId(e.id);
                  setValue("country", e.name);
                }}
              />
            </div>
          </div>
          {errors.country && <p className={errorClasses}>{errors.country.message}</p>}

          {/* State */}
          <div className="relative" data-tooltip-id="state-tooltip" data-tooltip-content="Select your state">
            <div className="state-select-wrapper">
              <StateSelect
                countryid={countryId}
                placeHolder={user?.state || "Select State"}
                value=""
                onChange={(e) => setValue("state", e.name)}
              />
            </div>
          </div>
          {errors.state && <p className={errorClasses}>{errors.state.message}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg transition-colors"
            data-tooltip-id="update-tooltip"
            data-tooltip-content="Click to update your profile information"
          >
            Update Profile
          </button>
        </form>

        {/* Tooltips */}
        {["name", "email", "gender", "mobile", "country", "state", "update"].map(id => (
          <Tooltip
            key={id}
            id={`${id}-tooltip`}
            className="max-w-xs bg-orange-900 text-white p-2 rounded-lg shadow-lg text-center"
            multiline
          />
        ))}
      </div>

      {/* Modals */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-sm text-center animate-fadeIn">
            <p className="mb-4 font-semibold text-gray-800 dark:text-gray-100">
              Are you sure you want to update your profile?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmUpdate}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-bold transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmModal(false)}
                className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-lg font-bold transition-colors"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {successModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-sm text-center animate-fadeIn">
            <p className="mb-4 font-semibold text-gray-800 dark:text-gray-100">
              Profile updated successfully!
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-bold transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* ✅ NUCLEAR OPTION: Target ALL elements within country/state select */
        .country-select-wrapper *,
        .state-select-wrapper * {
          color: inherit !important;
        }

        /* Hide ISO codes - they usually appear before country names */
        :is(.dark) .country-select-wrapper li::before,
        :is(.dark) .state-select-wrapper li::before,
        .country-select-wrapper li::before,
        .state-select-wrapper li::before {
          display: none !important;
        }

        /* Hide any span/element containing ISO codes (usually 2-3 char codes) */
        .country-select-wrapper li > span:first-child,
        .state-select-wrapper li > span:first-child {
          display: none !important;
        }

        /* Alternative: Hide short text nodes (ISO codes are typically 2-3 chars) */
        .country-select-wrapper li > *:not(:last-child),
        .state-select-wrapper li > *:not(:last-child) {
          margin-right: 0 !important;
        }

        /* Make country/state selects look like the gender select */
        .country-select-wrapper,
        .state-select-wrapper {
          border-radius: 0.375rem;
        }

        .country-select-wrapper > div,
        .state-select-wrapper > div {
          border-radius: 0.375rem !important;
        }

        /* Match the input field height and padding */
        .country-select-wrapper input,
        .state-select-wrapper input {
          padding: 0.75rem !important;
          height: auto !important;
          min-height: 48px;
        }

        /* Wrapper styling for dark mode */
        :is(.dark) .country-select-wrapper,
        :is(.dark) .state-select-wrapper {
          background-color: #374151 !important;
          border-radius: 0.375rem;
          border: 1px solid #4b5563;
        }

        /* Control box (the main input area) */
        :is(.dark) .country-select-wrapper input,
        :is(.dark) .state-select-wrapper input,
        :is(.dark) .country-select-wrapper select,
        :is(.dark) .state-select-wrapper select {
          background-color: #374151 !important;
          color: #f3f4f6 !important;
          border-color: #4b5563 !important;
        }

        /* Dropdown menu portal - this might render outside the wrapper */
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

        /* Dropdown options */
        :is(.dark) .csc-option,
        :is(.dark) [class*="option"],
        :is(.dark) li[role="option"],
        :is(.dark) div[role="option"] {
          background-color: #374151 !important;
          color: #f3f4f6 !important;
        }

        /* Hover state for options */
        :is(.dark) .csc-option:hover,
        :is(.dark) [class*="option"]:hover,
        :is(.dark) li[role="option"]:hover,
        :is(.dark) div[role="option"]:hover {
          background-color: #4b5563 !important;
          color: #ffffff !important;
        }

        /* Selected option */
        :is(.dark) .csc-option.selected,
        :is(.dark) [class*="option"][class*="selected"],
        :is(.dark) li[role="option"][aria-selected="true"],
        :is(.dark) div[role="option"][aria-selected="true"] {
          background-color: #d97706 !important;
          color: #ffffff !important;
        }

        /* Additional aggressive targeting */
        :is(.dark) .country-select-wrapper div,
        :is(.dark) .state-select-wrapper div {
          background-color: transparent;
        }

        :is(.dark) .country-select-wrapper div:has(> ul),
        :is(.dark) .state-select-wrapper div:has(> ul) {
          background-color: #374151 !important;
        }

        /* Target UL lists */
        :is(.dark) .country-select-wrapper ul,
        :is(.dark) .state-select-wrapper ul {
          background-color: #374151 !important;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        /* Target LI items */
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

        /* Absolutely positioned dropdown panels */
        :is(.dark) body > div[style*="position: absolute"],
        :is(.dark) body > div[style*="position: fixed"] {
          background-color: #374151 !important;
        }

        :is(.dark) body > div[style*="position: absolute"] ul,
        :is(.dark) body > div[style*="position: fixed"] ul {
          background-color: #374151 !important;
        }

        :is(.dark) body > div[style*="position: absolute"] li,
        :is(.dark) body > div[style*="position: fixed"] li {
          background-color: #374151 !important;
          color: #f3f4f6 !important;
        }

        :is(.dark) body > div[style*="position: absolute"] li:hover,
        :is(.dark) body > div[style*="position: fixed"] li:hover {
          background-color: #4b5563 !important;
          color: #ffffff !important;
        }
      `}</style>
    </div>
  );
};


export default EditProfile;

export default EditProfile;

