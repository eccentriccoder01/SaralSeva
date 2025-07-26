import React, { useContext, useState } from "react";
import { EmployeeContext } from "./context/EmployeeContext";
import profileIcon from "./../assets/profile.svg";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { Edit, Upload } from "lucide-react";

const schema = z.object({
  address: z.string().min(3, { message: "Address is required" }),
  aadhar_no: z.string().length(12, { message: "Aadhar must be 12 digits" }),
  pan_no: z.string().length(10, { message: "PAN must be 10 characters" }),
  DOB: z.string().min(1, { message: "Date of Birth is required" }),
  profilePic: z.any().refine((files) => files?.length > 0, { message: "Profile picture is required" }),
});

const ProfileInfoRow = ({ label, value }) => (
    <div className="py-3 grid grid-cols-3 gap-4">
        <dt className="text-md font-medium text-gray-500">{label}</dt>
        <dd className="text-md text-stone-800 col-span-2 font-semibold">{value || 'Not provided'}</dd>
    </div>
);

const Profile = () => {
  const { employee, id, getEmployee } = useContext(EmployeeContext);
  const [image, setImage] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
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
      await axios.post("http://localhost:5000/api/v1/employee/editEmployee", formData, { headers: { "Content-Type": "multipart/form-data" } });
      getEmployee(id);
      toast.success("Profile updated successfully!");
    } catch (error) { console.error("Error:", error); }
  };

  if (employee?.address) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className='text-3xl font-bold text-orange-900 jost'>My Profile</h1>
            <p className="mt-1 text-gray-500">Your personal and professional details.</p>
          </div>
          <Button className='gap-2 bg-amber-500 hover:bg-amber-600 text-orange-900 font-bold shadow-md'>
            <Edit size={18}/> Edit
          </Button>
        </div>
        <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8">
            <img src={employee?.profilePic} alt="Profile" className="w-40 h-40 rounded-full object-cover border-4 border-amber-300 shadow-lg"/>
            <div className="flex-1">
                <dl className="divide-y divide-gray-200">
                    <ProfileInfoRow label="Full Name" value={employee?.name} />
                    <ProfileInfoRow label="Employee ID" value={employee?.empId} />
                    <ProfileInfoRow label="Email" value={employee?.email} />
                    <ProfileInfoRow label="Phone" value={employee?.mobile} />
                </dl>
            </div>
        </div>
      </div>
    );
  }

  // Profile Completion Form
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">
      <Toaster position="top-center" richColors />
      <div className="text-center">
          <h1 className="text-3xl font-bold text-orange-900 jost">Welcome, {employee?.name}!</h1>
          <p className="mt-1 text-gray-500">Please complete your profile to continue.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div className="flex flex-col items-center">
          <label htmlFor="image" className="cursor-pointer">
            <img src={image ? URL.createObjectURL(image) : profileIcon} alt="Upload" className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 hover:border-amber-400" />
            <input type="file" hidden id="image" onChange={(e) => setImage(e.target.files[0])} {...register("profilePic")} />
          </label>
          <p className="text-sm text-gray-500 mt-2">Click image to upload photo</p>
          {errors.profilePic && <p className="text-red-500 text-sm mt-1">{errors.profilePic.message}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label>Date of Birth</label><input type="date" className="w-full p-2 mt-1 border border-gray-300 rounded-md" {...register("DOB")} />{errors.DOB && <p className="text-red-500 text-sm">{errors.DOB.message}</p>}</div>
            <div><label>Aadhar No</label><input type="number" className="w-full p-2 mt-1 border border-gray-300 rounded-md" {...register("aadhar_no")} />{errors.aadhar_no && <p className="text-red-500 text-sm">{errors.aadhar_no.message}</p>}</div>
        </div>
        
        <div><label>PAN No</label><input type="text" className="w-full p-2 mt-1 border border-gray-300 rounded-md" {...register("pan_no")} />{errors.pan_no && <p className="text-red-500 text-sm">{errors.pan_no.message}</p>}</div>
        <div><label>Address</label><textarea rows={3} className="w-full p-2 mt-1 border border-gray-300 rounded-md" {...register("address")}></textarea>{errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}</div>
        
        <div className="text-center">
          <Button className="px-10 py-6 font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg shadow-lg">SUBMIT PROFILE</Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;