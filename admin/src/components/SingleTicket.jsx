import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminContext } from "./context/adminContext";
import { Button } from "./ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import PDFViewer from "./PDFViewer";
import axios from "axios";
import moment from "moment";
import { Toaster, toast } from "sonner";
import { FileText } from "lucide-react";

const InfoRow = ({ label, value }) => (
    <div className="py-2">
        <p className="text-md text-gray-500">{label}</p>
        <p className="text-lg font-semibold text-stone-800">{value || 'N/A'}</p>
    </div>
);

const SingleTicket = () => {
  const { id } = useParams();
  const { singleTicket, getSingleAppliedScheme, admin } = useContext(AdminContext);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [formData, setFormData] = useState({ password: "", adminId: "", final_status: "", scheme_applied_id: id, id: localStorage.getItem("id") });
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => { getSingleAppliedScheme(id); }, [id]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/changeStatus`, formData);
      setError(res.data.message);
      if (res.data.message === "Status updated successfully") {
        getSingleAppliedScheme(id);
        setIsOpen(false);
        toast.success("Status changed successfully");
      }
    } catch (err) { setError(err.response?.data?.message || "An error occurred."); }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-center" richColors />
      <div className="p-4 text-2xl font-bold text-center text-white bg-orange-800 rounded-lg shadow-md">
        Registration No - {singleTicket?.registration_no}
      </div>
      {/* Fieldsets replaced by styled cards */}
      <div className="p-6 bg-white rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-orange-900 border-b pb-2 mb-4 jost">Applicant Details</h1>
          <div className="flex flex-col items-center gap-8 md:flex-row">
              <img src={singleTicket?.photo} alt="Applicant" className="w-40 h-40 rounded-full object-cover border-4 border-amber-300" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 flex-1">
                  <InfoRow label="Name" value={singleTicket?.name} />
                  <InfoRow label="Gender" value={singleTicket?.gender} />
                  <InfoRow label="DOB" value={moment(singleTicket?.DOB).format("DD-MM-YYYY")} />
                  <InfoRow label="Email" value={singleTicket?.email} />
                  <InfoRow label="Phone" value={singleTicket?.mobile} />
                  <InfoRow label="Nationality" value={singleTicket?.nationality} />
              </div>
          </div>
      </div>
      {/* Other details in a grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-2xl shadow-lg"><h2 className="text-2xl font-bold text-orange-900 border-b pb-2 mb-4 jost">Scheme Details</h2>
          <InfoRow label="Scheme Name" value={singleTicket?.scheme_name} />
          <InfoRow label="Scheme Code" value={singleTicket?.scheme_code} />
          <InfoRow label="Applied On" value={`${moment(singleTicket?.createdAt).format("DD-MM-YYYY")} - ${moment(singleTicket?.createdAt).format("HH:mm:ss")}`} />
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-lg"><h2 className="text-2xl font-bold text-orange-900 border-b pb-2 mb-4 jost">Personal Details</h2>
          <InfoRow label="Aadhar No." value={singleTicket?.aadharNo} />
          <InfoRow label="PAN No." value={singleTicket?.panNo} />
          <InfoRow label="Address" value={singleTicket?.address} />
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-lg"><h2 className="text-2xl font-bold text-orange-900 border-b pb-2 mb-4 jost">Bank Details</h2>
          <InfoRow label="Bank Name" value={singleTicket?.bank_name} />
          <InfoRow label="Account No." value={singleTicket?.bank_account_no} />
          <InfoRow label="IFSC Code" value={singleTicket?.ifsc_code} />
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-lg"><h2 className="text-2xl font-bold text-orange-900 border-b pb-2 mb-4 jost">Uploaded Documents</h2>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button variant="outline" onClick={() => setPdfUrl(singleTicket?.aadharPhoto)} className="gap-2"><FileText size={16}/> View Aadhar</Button>
            <Button variant="outline" onClick={() => setPdfUrl(singleTicket?.panPhoto)} className="gap-2"><FileText size={16}/> View PAN</Button>
            <Button variant="outline" onClick={() => setPdfUrl(singleTicket?.bank_passbook)} className="gap-2"><FileText size={16}/> View Passbook</Button>
          </div>
        </div>
      </div>
      {/* Status section */}
      <div className="p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-orange-900 border-b pb-2 mb-4 jost">Application Status</h2>
        <InfoRow label="Initial Status (by Employee)" value={singleTicket?.initial_status} />
        <InfoRow label="Employee Remarks" value={singleTicket?.remarks} />
        <InfoRow label="Assigned To" value={singleTicket?.assigned_to?.name} />
        <InfoRow label="Final Status (by Admin)" value={singleTicket?.final_status} />
        {singleTicket?.final_status === "pending" && (
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild><Button className="mt-5 text-lg font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600">Change Final Status</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader><AlertDialogTitle>Update Final Status</AlertDialogTitle></AlertDialogHeader>
              <div className="space-y-3">
                <input type="password" required placeholder="Enter your Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" />
                <input type="text" placeholder="Enter your Admin ID" required onChange={(e) => setFormData({ ...formData, adminId: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" />
                <select className="w-full p-2 border border-gray-300 rounded-md" onChange={(e) => setFormData({ ...formData, final_status: e.target.value })}>
                  <option>Select Final Status</option><option value="approved">Approved</option><option value="rejected">Rejected</option>
                </select>
                <p>Verified by: <span className="font-semibold">{admin?.name}</span></p>
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

      <AlertDialog open={!!pdfUrl} onOpenChange={(open) => !open && setPdfUrl(null)}>
        <AlertDialogContent className="max-w-4xl h-[90vh]"><PDFViewer pdfUrl={pdfUrl} /></AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SingleTicket;