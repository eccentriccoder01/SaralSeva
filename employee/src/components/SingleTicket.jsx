import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { EmployeeContext } from "./context/EmployeeContext";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import PDFViewer from "./PDFViewer";
import axios from "axios";
import { Toaster, toast } from "sonner";
import moment from "moment";
import { FileText } from "lucide-react";

const InfoRow = ({ label, value }) => (
    <div className="py-2">
        <p className="text-md text-gray-500">{label}</p>
        <p className="text-lg font-semibold text-stone-800">{value || 'N/A'}</p>
    </div>
);

const SingleTicket = () => {
  const { id } = useParams();
  const { singleTicket, getSingleAppliedScheme, employee } = useContext(EmployeeContext);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [formData, setFormData] = useState({ password: "", empID: "", remarks: "", initial_status: "", scheme_applied_id: id, id: localStorage.getItem("id") });
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => { getSingleAppliedScheme(id); }, [id]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("${import.meta.env.VITE_API_BASE_URL}/api/v1/employee/changeStatus", formData);
      setError(res.data.message);
      if (res.data.success) {
        getSingleAppliedScheme(id);
        setIsOpen(false);
        toast.success("Status changed successfully");
      }
    } catch (error) { console.log(error); }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-center" richColors />
      <div className="p-4 text-2xl font-bold text-center text-white bg-orange-800 rounded-lg shadow-md">
        Registration No - {singleTicket?.registration_no}
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-orange-900 border-b pb-2 mb-4 jost">Applicant Details</h2>
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <img src={singleTicket?.photo} alt="Applicant" className="w-40 h-40 rounded-full object-cover border-4 border-amber-300" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 flex-1">
                <InfoRow label="Name" value={singleTicket?.name} />
                <InfoRow label="Gender" value={singleTicket?.gender} />
                <InfoRow label="Date of Birth" value={moment(singleTicket?.DOB).format("DD-MM-YYYY")} />
                <InfoRow label="Email" value={singleTicket?.email} />
                <InfoRow label="Phone" value={singleTicket?.mobile} />
                <InfoRow label="Nationality" value={singleTicket?.nationality} />
            </div>
          </div>
      </div>
      
      {/* Other Details in a Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-orange-900 border-b pb-2 mb-4 jost">Scheme Details</h2>
            <InfoRow label="Scheme Name" value={singleTicket?.scheme_name} />
            <InfoRow label="Scheme Code" value={singleTicket?.scheme_code} />
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-orange-900 border-b pb-2 mb-4 jost">Personal Details</h2>
            <InfoRow label="Aadhar Card" value={singleTicket?.aadharNo} />
            <InfoRow label="PAN Card" value={singleTicket?.panNo} />
            <InfoRow label="Address" value={singleTicket?.address} />
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-orange-900 border-b pb-2 mb-4 jost">Bank Details</h2>
            <InfoRow label="Bank Name" value={singleTicket?.bank_name} />
            <InfoRow label="Branch" value={singleTicket?.bank_branch} />
            <InfoRow label="IFSC Code" value={singleTicket?.ifsc_code} />
            <InfoRow label="Account Number" value={singleTicket?.bank_account_no} />
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-orange-900 border-b pb-2 mb-4 jost">Uploaded Documents</h2>
            <div className="flex flex-wrap gap-4 mt-4">
              <Button variant="outline" onClick={() => setPdfUrl(singleTicket?.aadharPhoto)} className="gap-2"><FileText size={16}/> Aadhar</Button>
              <Button variant="outline" onClick={() => setPdfUrl(singleTicket?.panPhoto)} className="gap-2"><FileText size={16}/> PAN Card</Button>
              <Button variant="outline" onClick={() => setPdfUrl(singleTicket?.bank_passbook)} className="gap-2"><FileText size={16}/> Passbook</Button>
            </div>
          </div>
      </div>
      
      {/* Status Section */}
      <div className="p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-orange-900 border-b pb-2 mb-4 jost">Application Status</h2>
        <InfoRow label="Current Status" value={singleTicket?.initial_status} />
        <InfoRow label="Remarks" value={singleTicket?.remarks} />
        {singleTicket?.initial_status === "pending" && (
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button className="mt-5 text-lg font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg shadow-md hover:shadow-lg">Change Status</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Update Application Status</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="space-y-3">
                <input type="password" required placeholder="Enter your Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500" />
                <input type="text" placeholder="Enter your Employee ID" required onChange={(e) => setFormData({ ...formData, empID: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500" />
                <select className="w-full p-2 border border-gray-300 rounded-md" onChange={(e) => setFormData({ ...formData, initial_status: e.target.value })}>
                  <option>Select New Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Sent to Modal Officer">Sent to Modal Officer</option>
                </select>
                <input type="text" placeholder="Enter remarks..." required onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500" />
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

      {/* PDF Viewer Modal */}
      <AlertDialog open={!!pdfUrl} onOpenChange={(open) => !open && setPdfUrl(null)}>
        <AlertDialogContent className="max-w-4xl h-[90vh]">
          <AlertDialogHeader><AlertDialogTitle>Document Viewer</AlertDialogTitle></AlertDialogHeader>
          <div className="h-full"><PDFViewer pdfUrl={pdfUrl} /></div>
          <AlertDialogFooter><Button variant="outline" onClick={() => setPdfUrl(null)}>Close</Button></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SingleTicket;