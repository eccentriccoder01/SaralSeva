import React, { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "./context/EmployeeContext";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Button } from "./ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast, Toaster } from "sonner";
import axios from "axios";

const InfoRow = ({ label, value }) => (
    <div className="py-2 grid grid-cols-3 gap-4">
        <p className="text-md text-gray-500 col-span-1">{label}</p>
        <p className="text-lg font-semibold text-stone-800 col-span-2">{value || 'N/A'}</p>
    </div>
);

const SingleGrievance = () => {
  const { singleGrievance, getSingleGrievance, employee } = useContext(EmployeeContext);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ password: "", empID: "", remarks: "", status: "", grievance_id: id, id: localStorage.getItem("id") });

  useEffect(() => { getSingleGrievance(id); }, [id]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/employee/changeGrievanceStatus`, formData);
      setError(res.data.message);
      if (res.data.success) {
        getSingleGrievance(id);
        setIsOpen(false);
        toast.success("Status changed successfully");
      }
    } catch (error) { console.log(error); }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-center" richColors />
      <div className="p-4 text-2xl font-bold text-center text-white bg-orange-800 rounded-lg shadow-md">
        Grievance No - {singleGrievance?.grievance_registered_number}
      </div>
      <div className="p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-orange-900 border-b pb-2 mb-4 jost">Grievance Details</h2>
        <div className="divide-y divide-gray-200">
            <InfoRow label="Name" value={singleGrievance?.name} />
            <InfoRow label="Date of Birth" value={moment(singleGrievance?.DOB).format("DD-MM-YYYY")} />
            <InfoRow label="Gender" value={singleGrievance?.gender} />
            <InfoRow label="Email" value={singleGrievance?.email} />
            <InfoRow label="Mobile" value={singleGrievance?.mobile} />
            <InfoRow label="Address" value={`${singleGrievance?.address}, ${singleGrievance?.district}, ${singleGrievance?.state}, ${singleGrievance?.country}`} />
            <InfoRow label="Grievance Type" value={singleGrievance?.grievance_type} />
            <InfoRow label="Grievance Category" value={singleGrievance?.grievance_category} />
            <InfoRow label="Description" value={singleGrievance?.description} />
            <InfoRow label="Applied On" value={moment(singleGrievance?.createdAt).format("DD-MM-YYYY")} />
            <InfoRow label="Status" value={singleGrievance?.status} />
        </div>
        
        {singleGrievance?.status === "pending" && (
           <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
           <AlertDialogTrigger asChild>
             <Button className="mt-6 text-lg font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg shadow-md hover:shadow-lg">Change Status</Button>
           </AlertDialogTrigger>
           <AlertDialogContent>
             <AlertDialogHeader>
               <AlertDialogTitle>Update Grievance Status</AlertDialogTitle>
             </AlertDialogHeader>
              <div className="space-y-3">
                <input type="password" required placeholder="Enter your Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500" />
                <input type="text" placeholder="Enter your Employee ID" required onChange={(e) => setFormData({ ...formData, empID: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500" />
                <select className="w-full p-2 border border-gray-300 rounded-md" onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                  <option>Select New Status</option>
                  <option value="pending">Pending</option>
                  <option value="closed">Closed</option>
                </select>
                <input type="text" placeholder="Enter remarks..." required onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500" />
                <p className="text-sm">Verified by: <span className="font-semibold">{employee.name}</span></p>
                {error && <p className="text-center text-red-500">{error}</p>}
              </div>
             <AlertDialogFooter>
               <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
               <Button onClick={handleSubmit} className="bg-orange-700 hover:bg-orange-800">Submit</Button>
             </AlertDialogFooter>
           </AlertDialogContent>
         </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default SingleGrievance;