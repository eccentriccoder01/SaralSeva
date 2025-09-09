import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Validation schema like registration form
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

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    // Populate form with current user info
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

    const onSubmit = async (data) => {
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/updateUser/${id}`,
                data
            );
            if (res.data.success) {
                toast.success("Profile updated successfully!");
                getUser(id); // Refresh context
                navigate("/profile");
            } else {
                toast.error(res.data.message || "Failed to update profile");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update profile");
        }
    };

    const inputClasses = "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 outline-none";
    const errorClasses = "text-red-600 text-sm mt-1";

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input name="name" {...register("name")} placeholder="Name" className={inputClasses} />
                {errors.name && <p className={errorClasses}>{errors.name.message}</p>}

                <input name="email" {...register("email")} placeholder="Email" className={inputClasses} />
                {errors.email && <p className={errorClasses}>{errors.email.message}</p>}

                <select {...register("gender")} className={inputClasses}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                {errors.gender && <p className={errorClasses}>{errors.gender.message}</p>}

                <input name="mobile" {...register("mobile")} placeholder="Mobile" className={inputClasses} />
                {errors.mobile && <p className={errorClasses}>{errors.mobile.message}</p>}

                {/*Country + State */}
                <CountrySelect
                    placeHolder={user?.country || "Select Country"} // show current country as placeholder
                    value="" // keep empty so it doesn't preselect
                    onChange={(e) => {
                        setCountryId(e.id);
                        setValue("country", e.name);
                    }}
                />
                {errors.country && <p className={errorClasses}>{errors.country.message}</p>}

                <StateSelect
                    countryid={countryId}
                    placeHolder={user?.state || "Select State"} 
                    value="" 
                    onChange={(e) => setValue("state", e.name)}
                />
                {errors.state && <p className={errorClasses}>{errors.state.message}</p>}

                <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
