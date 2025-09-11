import  { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import moment from "moment";
import { Download } from "lucide-react";
import CreatePdfScheme from "./CreatePdfScheme";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'; // adjust path if needed

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
    <div className="min-h-screen bg-orange-50/30 dark:bg-gray-900/30 px-[5vw] py-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-orange-900 dark:text-orange-400 mb-8 jost transition-colors duration-500">
          My Applied Schemes
        </h1>
        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-colors duration-500">
          {user?.schemes_applied && user.schemes_applied.length > 0 ? (
            <Table>
              <TableCaption className="dark:text-gray-300">
                A list of all schemes you have applied for.
              </TableCaption>
              <TableHeader className="bg-orange-900 dark:bg-orange-800 transition-colors duration-500">
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
                  <TableRow
                    key={index}
                    className="hover:bg-orange-50/70 dark:hover:bg-gray-700/50 transition-colors duration-300"
                  >
                    <TableCell className="font-medium text-gray-700 dark:text-gray-300">{index + 1}</TableCell>
                    <TableCell className="font-semibold text-stone-800 dark:text-gray-200">{item?.scheme_name}</TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">{item?.registration_no}</TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {moment(item?.created_at).format("DD MMM, YYYY")}
                    </TableCell>
                    <TableCell>
                      <span className="px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 dark:text-blue-200 dark:bg-blue-900/30 rounded-full transition-colors duration-500">
                        {item?.initial_status}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                    <div>
                        <button
                          id={`downloadBtn-${index}`}
                          onClick={() => handlePdf(item)}
                          className="p-2 transition-colors rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <Download className="w-6 h-6 text-red-700 dark:text-red-400" />
                        </button>
                        <Tooltip
                          anchorId={`downloadBtn-${index}`}
                          place="top"
                          content="Download your scheme application as a PDF"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="mt-5 text-center text-xl text-gray-500 dark:text-gray-300 py-20 transition-colors duration-500">
              You have not applied for any schemes yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemeApplied;