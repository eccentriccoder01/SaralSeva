import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast, Toaster } from "sonner";
import Lottie from "lottie-react";
import loader from './../assets/loader.json';
import { FaArrowLeft } from "react-icons/fa";

const schema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  mobile: z.string().regex(/^[0-9]{10}$/, { message: "Mobile number must be exactly 10 digits" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
  district: z.string().min(1, { message: "District is required" }),
  address: z.string().min(3, { message: "Address is required" }),
  DOB: z.string().min(1, { message: "Date of birth is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  grievance_category: z.string().min(1, { message: "Grievance Category is required" }),
  grievance_type: z.string().min(1, { message: "Grievance Type is required" }),
  document: z.any().refine((files) => files?.length > 0, { message: "A supporting document is required" }),
});

const FormField = ({ id, label, register, errors, ...props }) => {
  const inputClasses = "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none";
  const errorClasses = "text-red-600 text-sm mt-1";

  return (
    <div>
      <label htmlFor={id} className="block font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <input id={id} {...register(id)} className={inputClasses} {...props} />
      {errors[id] && <p className={errorClasses}>{errors[id].message}</p>}
    </div>
  );
};

const GrievancesRegistrationForm = ({ isAuthenticated }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const id = localStorage.getItem("id");

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("id", id);

    for (const key in data) {
      if (data[key] instanceof FileList) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/grievances/apply`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.message === 'Grievances applied successfully') {
        toast.success("Grievance submitted successfully!");
        navigate('/grievances_success', { state: { grievance: response.data.data } });
      }
    } catch (error) {
      toast.error("An error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-white dark:bg-gray-900/80">
        <Lottie animationData={loader} className="w-40 lg:w-80 md:w-60" />
        <p className="text-xl text-orange-800 dark:text-orange-400 font-semibold mt-4">
          Submitting Grievance...
        </p>
      </div>
    );
  }

  // Not authenticated view
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4 bg-orange-50/30 dark:bg-gray-900/30 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold text-orange-900 dark:text-orange-400">Please Log In</h1>
          <p className="my-4 text-lg text-gray-600 dark:text-gray-300">
            Grievances can only be lodged by registered and logged-in users.
          </p>
          <p className="my-2 text-gray-600 dark:text-gray-300">
            If you are a registered user, please <Link to="/userLogin" className="font-bold text-orange-700 dark:text-amber-400 hover:underline">Login</Link>.
          </p>
          <p className="my-2 text-gray-600 dark:text-gray-300">
            Not yet registered? <Link to="/register" className="font-bold text-orange-700 dark:text-amber-400 hover:underline">Register here</Link>.
          </p>
        </div>
      </div>
    );
  }

  // Main form view
  return (
    <div className="bg-orange-50/30 dark:bg-gray-900/30 py-12 transition-colors duration-300">
      <Toaster position="top-center" richColors />
      <div className="relative max-w-6xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transition-colors duration-300">
        
        {/* Go Back Arrow */}
        <FaArrowLeft
  className="absolute left-4 top-10 text-orange-500 hover:text-amber-400 cursor-pointer text-2xl"
  onClick={() => navigate(-1)}
  title="Go Back"
/>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center text-orange-900 dark:text-orange-400 jost mb-8">
          Grievance Registration Form
        </h1>

        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Personal Details */}
          <fieldset className="p-6 border border-gray-300 dark:border-gray-600 rounded-lg transition-colors duration-300">
            <legend className="px-2 text-xl font-bold text-orange-800 dark:text-orange-400">Personal Details</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              <FormField id="name" label="Full Name" register={register} errors={errors} placeholder="Enter your full name" />
              <FormField id="email" label="Email" register={register} errors={errors} placeholder="Enter your email" />
              <FormField id="mobile" label="Mobile" register={register} errors={errors} type="tel" placeholder="Enter 10-digit mobile" />
              <FormField id="DOB" label="Date of Birth" register={register} errors={errors} type="date" />

              <div>
                <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                <select {...register("gender")} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-amber-500">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>}
              </div>
            </div>
          </fieldset>

          {/* Location & Grievance Details */}
          <fieldset className="p-6 border border-gray-300 dark:border-gray-600 rounded-lg transition-colors duration-300">
            <legend className="px-2 text-xl font-bold text-orange-800 dark:text-orange-400">Location & Grievance Details</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              <FormField id="country" label="Country" register={register} errors={errors} defaultValue="India" />
              <FormField id="state" label="State/UT" register={register} errors={errors} placeholder="Enter your State/UT" />
              <FormField id="district" label="District" register={register} errors={errors} placeholder="Enter your District" />
              <FormField id="grievance_category" label="Grievance Category" register={register} errors={errors} placeholder="e.g., Public Services" />
              <FormField id="grievance_type" label="Grievance Type" register={register} errors={errors} placeholder="e.g., Water Supply Issue" />
            </div>

            <div className="mt-6">
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Full Address</label>
              <textarea {...register("address")} rows={3} placeholder="Enter your full address" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-amber-500"></textarea>
              {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
            </div>

            <div className="mt-6">
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Description of Grievance</label>
              <textarea {...register("description")} rows={5} placeholder="Describe your issue in detail" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-amber-500"></textarea>
              {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div className="mt-6">
              <FormField id="document" label="Upload Supporting Document (PDF only)" type="file" accept=".pdf" register={register} errors={errors} />
            </div>
          </fieldset>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4 pt-6">
            <Button type="reset" variant="outline" className="px-10 py-6 text-lg font-bold border-2 border-gray-400 text-gray-600 dark:text-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">Reset</Button>
            <Button type="submit" className="px-10 py-6 text-lg font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg shadow-lg hover:shadow-xl">Submit Grievance</Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default GrievancesRegistrationForm;
