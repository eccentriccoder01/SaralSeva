import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { EmployeeContext } from "./context/EmployeeContext";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import PDFViewer from "./PDFViewer";
import axios from "axios";
import { Toaster, toast } from "sonner";
import moment from "moment";
import {
  FileText,
  Download,
  RefreshCw,
  Printer,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowLeft,
  History,
} from "lucide-react";

const InfoRow = ({ label, value }) => (
  <div className="py-2">
    <p className="text-md text-gray-500">{label}</p>
    <p className="text-lg font-semibold text-stone-800">{value || "N/A"}</p>
  </div>
);

const SingleTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleTicket, getSingleAppliedScheme, employee } =
    useContext(EmployeeContext);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [formData, setFormData] = useState({
    password: "",
    empID: "",
    remarks: "",
    initial_status: "",
    scheme_applied_id: id,
    id: localStorage.getItem("id"),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);

  useEffect(() => {
    loadTicketData();
  }, [id]);

  const loadTicketData = async () => {
    setLoading(true);
    try {
      await getSingleAppliedScheme(id);
    } catch (error) {
      toast.error("Failed to load ticket data");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadTicketData();
    setIsRefreshing(false);
    toast.success("Data refreshed successfully");
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.password) errors.password = "Password is required";
    if (!formData.empID) errors.empID = "Employee ID is required";
    if (
      !formData.initial_status ||
      formData.initial_status === "Select New Status"
    ) {
      errors.initial_status = "Please select a status";
    }
    if (!formData.remarks) errors.remarks = "Remarks are required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      setShowConfirmDialog(true);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/employee/changeStatus`,
        formData
      );
      setError(res.data.message);
      if (res.data.success) {
        await getSingleAppliedScheme(id);
        setIsOpen(false);
        setShowConfirmDialog(false);
        setFormData({
          ...formData,
          password: "",
          empID: "",
          remarks: "",
          initial_status: "",
        });
        setValidationErrors({});
        toast.success("Status changed successfully");
      }
    } catch (error) {
      toast.error("Failed to update status");
      setError("Failed to update status. Please try again.");
    }
  };

  const handleDownloadDocument = async (url, filename) => {
    try {
      toast.info("Downloading document...");
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
      toast.success("Document downloaded successfully");
    } catch (error) {
      toast.error("Failed to download document");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <Clock className="text-yellow-500" size={20} />;
      case "approved":
        return <CheckCircle className="text-green-500" size={20} />;
      case "rejected":
        return <AlertCircle className="text-red-500" size={20} />;
      default:
        return <Clock className="text-blue-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw
            className="animate-spin mx-auto mb-4 text-orange-700"
            size={48}
          />
          <p className="text-lg text-gray-600">Loading ticket details...</p>
        </div>
      </div>
    );
  }

  if (!singleTicket) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={64} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Ticket Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The requested application could not be found.
          </p>
          <Button onClick={() => navigate(-1)} className="bg-orange-700">
            <ArrowLeft className="mr-2" size={16} />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 print:space-y-4">
      <Toaster position="top-center" richColors />

      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>
          <div className="p-4 text-2xl font-bold text-white bg-orange-800 rounded-lg shadow-md">
            Registration No - {singleTicket?.registration_no}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              size={16}
            />
            Refresh
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2" size={16} />
            Print
          </Button>
        </div>
      </div>

      {/* Print-only Header */}
      <div className="hidden print:block text-center mb-4">
        <h1 className="text-3xl font-bold text-orange-900">
          Application Details
        </h1>
        <p className="text-lg">
          Registration No: {singleTicket?.registration_no}
        </p>
        <p className="text-sm text-gray-600">
          Printed on: {moment().format("DD-MM-YYYY HH:mm")}
        </p>
      </div>

      {/* Applicant Details */}
      <div className="p-6 bg-white rounded-2xl shadow-lg print:shadow-none">
        <h1 className="text-2xl font-bold text-orange-900 border-b pb-2 mb-4 jost">
          Applicant Details
        </h1>
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <img
            src={singleTicket?.photo}
            alt="Applicant"
            className="w-40 h-40 rounded-full object-cover border-4 border-amber-300"
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Crect fill='%23ddd' width='160' height='160'/%3E%3Ctext fill='%23999' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='24'%3ENo Photo%3C/text%3E%3C/svg%3E";
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 flex-1">
            <InfoRow label="Name" value={singleTicket?.name} />
            <InfoRow label="Gender" value={singleTicket?.gender} />
            <InfoRow
              label="Date of Birth"
              value={moment(singleTicket?.DOB).format("DD-MM-YYYY")}
            />
            <InfoRow label="Email" value={singleTicket?.email} />
            <InfoRow label="Phone" value={singleTicket?.mobile} />
            <InfoRow label="Nationality" value={singleTicket?.nationality} />
          </div>
        </div>
      </div>

      {/* Other Details in a Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-2xl shadow-lg print:shadow-none">
          <h2 className="text-2xl font-bold text-orange-900 border-b pb-2 mb-4 jost">
            Scheme Details
          </h2>
          <InfoRow label="Scheme Name" value={singleTicket?.scheme_name} />
          <InfoRow label="Scheme Code" value={singleTicket?.scheme_code} />
          <InfoRow
            label="Applied Date"
            value={moment(singleTicket?.created_at).format("DD-MM-YYYY")}
          />
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-lg print:shadow-none">
          <h2 className="text-2xl font-bold text-orange-900 border-b pb-2 mb-4 jost">
            Personal Details
          </h2>
          <InfoRow label="Aadhar Card" value={singleTicket?.aadharNo} />
          <InfoRow label="PAN Card" value={singleTicket?.panNo} />
          <InfoRow label="Address" value={singleTicket?.address} />
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-lg print:shadow-none">
          <h2 className="text-2xl font-bold text-orange-900 border-b pb-2 mb-4 jost">
            Bank Details
          </h2>
          <InfoRow label="Bank Name" value={singleTicket?.bank_name} />
          <InfoRow label="Branch" value={singleTicket?.bank_branch} />
          <InfoRow label="IFSC Code" value={singleTicket?.ifsc_code} />
          <InfoRow
            label="Account Number"
            value={singleTicket?.bank_account_no}
          />
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-lg print:shadow-none">
          <h2 className="text-2xl font-bold text-orange-900 border-b pb-2 mb-4 jost">
            Uploaded Documents
          </h2>
          <div className="flex flex-col gap-3 mt-4">
            {singleTicket?.aadharPhoto && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPdfUrl(singleTicket?.aadharPhoto)}
                  className="gap-2 flex-1"
                >
                  <FileText size={16} /> View Aadhar
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleDownloadDocument(
                      singleTicket?.aadharPhoto,
                      `Aadhar_${singleTicket?.registration_no}.pdf`
                    )
                  }
                >
                  <Download size={16} />
                </Button>
              </div>
            )}
            {singleTicket?.panPhoto && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPdfUrl(singleTicket?.panPhoto)}
                  className="gap-2 flex-1"
                >
                  <FileText size={16} /> View PAN Card
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleDownloadDocument(
                      singleTicket?.panPhoto,
                      `PAN_${singleTicket?.registration_no}.pdf`
                    )
                  }
                >
                  <Download size={16} />
                </Button>
              </div>
            )}
            {singleTicket?.bank_passbook && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPdfUrl(singleTicket?.bank_passbook)}
                  className="gap-2 flex-1"
                >
                  <FileText size={16} /> View Passbook
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleDownloadDocument(
                      singleTicket?.bank_passbook,
                      `Passbook_${singleTicket?.registration_no}.pdf`
                    )
                  }
                >
                  <Download size={16} />
                </Button>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-4 print:hidden">
            Click view to preview or download icon to save documents
          </p>
        </div>
      </div>

      {/* Status Section */}
      <div className="p-6 bg-white rounded-2xl shadow-lg print:shadow-none">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-orange-900 border-b pb-2 jost">
            Application Status
          </h2>
          {singleTicket?.status_history && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHistoryDialog(true)}
              className="print:hidden"
            >
              <History className="mr-2" size={16} />
              View History
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3 mb-4">
          {getStatusIcon(singleTicket?.initial_status)}
          <div
            className={`px-4 py-2 rounded-lg border-2 ${getStatusColor(
              singleTicket?.initial_status
            )}`}
          >
            <p className="font-bold text-lg">
              {singleTicket?.initial_status || "N/A"}
            </p>
          </div>
        </div>

        <InfoRow label="Remarks" value={singleTicket?.remarks} />
        <InfoRow
          label="Last Updated"
          value={moment(singleTicket?.updated_at).format("DD-MM-YYYY HH:mm")}
        />

        {singleTicket?.initial_status === "pending" && (
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button className="mt-5 text-lg font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg shadow-md hover:shadow-lg print:hidden">
                Change Status
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Update Application Status</AlertDialogTitle>
                <AlertDialogDescription>
                  Fill in the required information to update the application
                  status.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-3">
                <div>
                  <input
                    type="password"
                    required
                    placeholder="Enter your Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className={`w-full p-2 border rounded-md focus:ring-amber-500 ${
                      validationErrors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {validationErrors.password && (
                    <p className="text-sm text-red-500 mt-1">
                      {validationErrors.password}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Enter your Employee ID"
                    required
                    value={formData.empID}
                    onChange={(e) =>
                      setFormData({ ...formData, empID: e.target.value })
                    }
                    className={`w-full p-2 border rounded-md focus:ring-amber-500 ${
                      validationErrors.empID
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {validationErrors.empID && (
                    <p className="text-sm text-red-500 mt-1">
                      {validationErrors.empID}
                    </p>
                  )}
                </div>

                <div>
                  <select
                    className={`w-full p-2 border rounded-md ${
                      validationErrors.initial_status
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    value={formData.initial_status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        initial_status: e.target.value,
                      })
                    }
                  >
                    <option>Select New Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Sent to Modal Officer">
                      Sent to Modal Officer
                    </option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  {validationErrors.initial_status && (
                    <p className="text-sm text-red-500 mt-1">
                      {validationErrors.initial_status}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    placeholder="Enter remarks..."
                    required
                    value={formData.remarks}
                    onChange={(e) =>
                      setFormData({ ...formData, remarks: e.target.value })
                    }
                    className={`w-full p-2 border rounded-md focus:ring-amber-500 min-h-24 ${
                      validationErrors.remarks
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {validationErrors.remarks && (
                    <p className="text-sm text-red-500 mt-1">
                      {validationErrors.remarks}
                    </p>
                  )}
                </div>

                {error && (
                  <p className="text-center text-red-500 font-medium">
                    {error}
                  </p>
                )}
              </div>
              <AlertDialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    setValidationErrors({});
                    setError(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleFormSubmit}
                  className="bg-orange-700 hover:bg-orange-800"
                >
                  Submit
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the status to{" "}
              <strong>{formData.initial_status}</strong>? This action will be
              recorded in the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Remarks:</p>
            <p className="text-sm font-medium">{formData.remarks}</p>
          </div>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Go Back
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-orange-700 hover:bg-orange-800"
            >
              Confirm & Submit
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Status History Dialog */}
      <AlertDialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Status History</AlertDialogTitle>
            <AlertDialogDescription>
              Track all status changes for this application
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="max-h-96 overflow-y-auto">
            {singleTicket?.status_history &&
            singleTicket.status_history.length > 0 ? (
              <div className="space-y-4">
                {singleTicket.status_history.map((history, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-orange-500 pl-4 py-2"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(history.status)}
                      <p className="font-bold">{history.status}</p>
                    </div>
                    <p className="text-sm text-gray-600">{history.remarks}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      By: {history.updated_by} |{" "}
                      {moment(history.updated_at).format("DD-MM-YYYY HH:mm")}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                No status history available
              </p>
            )}
          </div>
          <AlertDialogFooter>
            <Button onClick={() => setShowHistoryDialog(false)}>Close</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* PDF Viewer Modal */}
      <AlertDialog
        open={!!pdfUrl}
        onOpenChange={(open) => !open && setPdfUrl(null)}
      >
        <AlertDialogContent className="max-w-4xl h-[90vh]">
          <AlertDialogHeader>
            <AlertDialogTitle>Document Viewer</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="h-full overflow-auto">
            <PDFViewer pdfUrl={pdfUrl} />
          </div>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setPdfUrl(null)}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            margin: 1cm;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:space-y-4 > * + * {
            margin-top: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SingleTicket;
