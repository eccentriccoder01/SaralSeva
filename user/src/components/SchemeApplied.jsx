import React, { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import moment from "moment";
import { Download } from "lucide-react";
import CreatePdfScheme from "./CreatePdfScheme";

const SchemeApplied = () => {
  const { user, id, getUser } = useContext(UserContext);

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id, getUser]);

  const handlePdf = (scheme) => {
    const doc = CreatePdfScheme(scheme);
    doc.save(`${scheme.registration_no}.pdf`);
  };

  return (
    <div className="min-h-screen bg-orange-50/30 px-[5vw] py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-orange-900 mb-8 jost">My Applied Schemes</h1>
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-lg bg-white">
          {user?.schemes_applied && user.schemes_applied.length > 0 ? (
            <Table>
              <TableCaption>A list of all schemes you have applied for.</TableCaption>
              <TableHeader className="bg-orange-900">
                <TableRow>
                  <TableHead className="text-white font-semibold">Sl No</TableHead>
                  <TableHead className="text-white font-semibold">Scheme Name</TableHead>
                  <TableHead className="text-white font-semibold">Registration No.</TableHead>
                  <TableHead className="text-white font-semibold">Applied On</TableHead>
                  <TableHead className="text-white font-semibold">Status</TableHead>
                  <TableHead className="text-white font-semibold text-center">Download</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user.schemes_applied.map((item, index) => (
                  <TableRow key={index} className="hover:bg-orange-50/70">
                    <TableCell className="font-medium text-gray-700">{index + 1}</TableCell>
                    <TableCell className="font-semibold text-stone-800">{item?.scheme_name}</TableCell>
                    <TableCell className="text-gray-600">{item?.registration_no}</TableCell>
                    <TableCell className="text-gray-600">{moment(item?.created_at).format("DD MMM, YYYY")}</TableCell>
                    <TableCell>
                        <span className="px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">{item?.initial_status}</span>
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
            <p className="mt-5 text-center text-xl text-gray-500 py-20">You have not applied for any schemes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemeApplied;