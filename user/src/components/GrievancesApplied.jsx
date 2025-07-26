import React, { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import moment from "moment";
import { Download } from "lucide-react";
import CreatePdfGrievance from "./CreatePdfGrievance";

const GrievancesApplied = () => {
  const { user, id, getUser } = useContext(UserContext);

  useEffect(() => {
    if(id) {
        getUser(id);
    }
  }, [id, getUser]);

  const handlePdf = (grievance) => {
    const doc = CreatePdfGrievance(grievance);
    doc.save(`${grievance.grievance_registered_number}.pdf`);
  };

  return (
    <div className="min-h-screen bg-orange-50/30 px-[5vw] py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-orange-900 mb-8 jost">My Lodged Grievances</h1>
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-lg bg-white">
          {user?.grievances && user.grievances.length > 0 ? (
            <Table>
              <TableCaption>A list of all grievances you have submitted.</TableCaption>
              <TableHeader className="bg-orange-900">
                <TableRow>
                  <TableHead className="text-white font-semibold">Sl No</TableHead>
                  <TableHead className="text-white font-semibold">Grievance No.</TableHead>
                  <TableHead className="text-white font-semibold">Description</TableHead>
                  <TableHead className="text-white font-semibold">Applied On</TableHead>
                  <TableHead className="text-white font-semibold">Status</TableHead>
                  <TableHead className="text-white font-semibold text-center">Download</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user.grievances.map((item, index) => (
                  <TableRow key={index} className="hover:bg-orange-50/70">
                    <TableCell className="font-medium text-gray-700">{index + 1}</TableCell>
                    <TableCell className="font-semibold text-stone-800">{item?.grievance_registered_number}</TableCell>
                    <TableCell className="text-gray-600 max-w-md truncate">{item?.description}</TableCell>
                    <TableCell className="text-gray-600">{moment(item?.createdAt).format("DD MMM, YYYY")}</TableCell>
                    <TableCell>
                      <span className="px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full capitalize">{item?.status}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <button onClick={() => handlePdf(item)} className="p-2 transition-colors rounded-full hover:bg-gray-200">
                        <Download className="w-6 h-6 text-red-700"/>
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-xl text-gray-500 py-20">You have not lodged any grievances yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrievancesApplied;