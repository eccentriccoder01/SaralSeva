import React from "react";
import sms from "../assets/register-sms.png";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, Toaster } from "sonner";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  mobile: z.string().length(10, { message: "Mobile number must be 10 digits" }).regex(/^[0-9]+$/, { message: "Invalid mobile number" }),
  adminId: z.string().min(6, { message: "Admin Id must be at least 6 characters" }),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
});

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/admin/registerAdmin", data);
      if (res.data.success) {
        toast.success("Admin registered successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  const inputClasses = "w-full p-3 border border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none";
  const errorClasses = "text-red-600 text-sm mt-1";

  return (
    <div className="min-h-[70vh] py-10 bg-orange-50/30 flex items-center justify-center">
      <Toaster position="top-center" richColors />
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
          <div className="text-center lg:text-left lg:w-1/3">
            <img src={sms} alt="Register your account" className="max-w-xs mx-auto lg:max-w-sm" />
            <h1 className="text-4xl font-extrabold text-orange-900 mt-6 jost">Create an Admin Account</h1>
            <p className="text-lg text-gray-600 mt-2">
              Already have an Account?{' '}
              <Link to='/login' className="font-semibold text-orange-700 hover:underline">Log In</Link>
            </p>
          </div>

          <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input id="name" type="text" placeholder="Enter your Name" {...register("name")} className={inputClasses} />
              {errors.name && <p className={errorClasses}>{errors.name.message}</p>}

              <select {...register("gender")} className={inputClasses}>
                <option value="">Select Gender</option> <option value="male">Male</option> <option value="female">Female</option>
              </select>
              {errors.gender && <p className={errorClasses}>{errors.gender.message}</p>}

              <input id="email" type="text" placeholder="Enter your Email" {...register("email")} className={inputClasses} />
              {errors.email && <p className={errorClasses}>{errors.email.message}</p>}

              <input type="password" placeholder="Enter your Password" {...register("password")} className={inputClasses} />
              {errors.password && <p className={errorClasses}>{errors.password.message}</p>}

              <input type="tel" placeholder="Enter your Mobile Number" {...register("mobile")} className={inputClasses} />
              {errors.mobile && <p className={errorClasses}>{errors.mobile.message}</p>}

              <input type="text" placeholder="Enter your Admin Id" {...register("adminId")} className={inputClasses} />
              {errors.adminId && <p className={errorClasses}>{errors.adminId.message}</p>}

              <Button className="w-full text-lg py-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg shadow-lg" type="submit">
                Create Account
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;