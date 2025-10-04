import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast, Toaster } from "sonner";
import Lottie from "lottie-react";
import loader from "./../../../assets/loader.json";

// --- Zod Validation Schema ---
const schema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  mobile: z.string().regex(/^[0-9]{10}$/, { message: "Mobile number must be exactly 10 digits" }),
  scheme_name: z.string().min(1, { message: "Scheme name is required" }),
  scheme_code: z.string().min(1, { message: "Scheme code is required" }),
  DOB: z.string().min(1, { message: "Date of birth is required" }),
  gender: z.enum(["male", "female", "transgender"], { message: "Gender is required" }),
  photo: z.any().refine((files) => files?.length > 0, { message: "Passport Photo is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  aadharNo: z.string().regex(/^[0-9]{12}$/, { message: "Aadhar number must be 12 digits" }),
  aadharPhoto: z.any().refine((files) => files?.length > 0, { message: "Aadhar card photo is required" }),
  panNo: z.string().min(10).max(10),
  panPhoto: z.any().refine((files) => files?.length > 0, { message: "PAN card photo is required" }),
  nationality: z.string().min(1, { message: "Nationality is required" }),
  occupation: z.string().min(1, { message: "Occupation is required" }),
  income: z.string().min(1, { message: "Income is required" }),
  bank_account_no: z.string().min(1, { message: "Bank account number is required" }),
  ifsc_code: z.string().min(1, { message: "IFSC code is required" }),
  bank_name: z.string().min(1, { message: "Bank name is required" }),
  bank_branch: z.string().min(1, { message: "Bank branch is required" }),
  bank_passbook: z.any().refine((files) => files?.length > 0, { message: "Bank Passbook is required" }),
  govt_officials: z.string().min(1, { message: "Please confirm if you are a government official" }),
});

// --- Reusable FormField Component ---
const FormField = ({ id, label, register, errors, ...props }) => {
  const inputClasses =
    "w-full p-3 border border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none";
  const errorClasses = "text-red-600 text-sm mt-1";
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-medium text-gray-700 mb-1">{label}</label>
      <input
        id={id}
        {...register(id)}
        className={inputClasses}
        {...props}
        onInput={(e) => {
          if (id === "panNo") e.target.value = e.target.value.toUpperCase();
        }}
      />
      {errors[id] && <p className={errorClasses}>{errors[id].message}</p>}
    </div>
  );
};

// --- Reusable SelectField Component ---
const SelectField = ({ id, label, register, errors, children, ...props }) => {
  const selectClasses =
    "w-full p-3 border border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none";
  const errorClasses = "text-red-600 text-sm mt-1";
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-medium text-gray-700 mb-1">{label}</label>
      <select id={id} {...register(id)} className={selectClasses} {...props}>
        {children}
      </select>
      {errors[id] && <p className={errorClasses}>{errors[id].message}</p>}
    </div>
  );
};

// --- Main Component ---
const SchemeAppliedForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const location = useLocation();
  const { scheme_name, scheme_code } = location.state || {};
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [loading, setLoading] = useState(false);

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
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/scheme/schemeApplied`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.message === "Scheme applied successfully") {
        toast.success("Scheme applied successfully");
        navigate("/scheme_applied_success", { state: { scheme: response.data.data } });
      }
    } catch (error) {
      toast.error("An error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-white/80">
        <Lottie animationData={loader} className="w-40 lg:w-80 md:w-60" />
        <p className="text-xl text-orange-800 font-semibold mt-4">Submitting Application...</p>
      </div>
    );
  }

  return (
    <div className="bg-orange-50/30 py-12">
      <Toaster position="top-center" richColors />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 sm:p-6 space-y-8 max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl"
      >
        <h1 className="text-4xl font-extrabold text-center text-orange-900 jost">
          {scheme_name} Registration Form
        </h1>

        {/* Scheme Details */}
        <fieldset className="p-6 border border-gray-300 rounded-lg">
          <legend className="px-2 text-xl font-bold text-orange-800">Scheme Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <FormField id="scheme_name" label="Scheme Name" defaultValue={scheme_name} register={register} errors={errors} readOnly />
            <FormField id="scheme_code" label="Scheme Code" defaultValue={scheme_code} register={register} errors={errors} readOnly />
          </div>
        </fieldset>

        {/* User Details */}
        <fieldset className="p-6 border border-gray-300 rounded-lg">
          <legend className="px-2 text-xl font-bold text-orange-800">User Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            <FormField id="name" label="Full Name" placeholder="Enter your full name" register={register} errors={errors} />
            <FormField id="email" label="Email" placeholder="Enter your Email" register={register} errors={errors} />
            <FormField id="mobile" label="Phone Number" placeholder="Enter your 10-digit number" type="tel" register={register} errors={errors} />
            <SelectField id="gender" label="Gender" register={register} errors={errors}>
              <option value="">Choose Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="transgender">Transgender</option>
            </SelectField>
            <FormField id="DOB" label="Date of Birth" type="date" register={register} errors={errors} />
            <SelectField id="nationality" label="Nationality" register={register} errors={errors}>
              <option value="">Choose Nationality</option>
              <option value="Indian">Indian</option>
              <option value="Others">Other</option>
            </SelectField>
          </div>
        </fieldset>

        {/* Personal & Bank Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <fieldset className="p-6 border border-gray-300 rounded-lg">
            <legend className="px-2 text-xl font-bold text-orange-800">Personal Details</legend>
            <div className="space-y-4 mt-4">
              <FormField id="aadharNo" label="Aadhar Number" placeholder="Enter 12-digit Aadhar" type="text" register={register} errors={errors} inputMode="numeric" pattern="\d{12}" />
              <FormField id="panNo" label="PAN Number" placeholder="Enter 10-character PAN" register={register} errors={errors} />
              <FormField id="occupation" label="Occupation" placeholder="Enter Occupation" register={register} errors={errors} />
              <FormField id="income" label="Income" placeholder="Enter Income" register={register} errors={errors} />
            </div>
          </fieldset>
          <fieldset className="p-6 border border-gray-300 rounded-lg">
            <legend className="px-2 text-xl font-bold text-orange-800">Bank Details</legend>
            <div className="space-y-4 mt-4">
              <FormField id="bank_name" label="Bank Name" placeholder="Enter your Bank Name" register={register} errors={errors} />
              <FormField id="bank_account_no" label="Account Number" placeholder="Enter your Account Number" register={register} errors={errors} />
              <FormField id="ifsc_code" label="IFSC Code" placeholder="Enter IFSC Code" register={register} errors={errors} />
              <FormField id="bank_branch" label="Branch" placeholder="Enter Bank Branch" register={register} errors={errors} />
            </div>
          </fieldset>
        </div>

        {/* Upload Documents */}
        <fieldset className="p-6 border border-gray-300 rounded-lg">
          <legend className="px-2 text-xl font-bold text-orange-800">Upload Documents</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <FormField id="photo" label="Passport Photo" type="file" register={register} errors={errors} />
            <FormField id="aadharPhoto" label="Aadhar Card" type="file" register={register} errors={errors} />
            <FormField id="panPhoto" label="PAN Card" type="file" register={register} errors={errors} />
            <FormField id="bank_passbook" label="Bank Passbook" type="file" register={register} errors={errors} />
          </div>
        </fieldset>

        <div className="text-center pt-6">
          <Button type="submit" className="w-full max-w-xs text-xl py-7 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-px transition-all">
            Submit Application
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SchemeAppliedForm;
