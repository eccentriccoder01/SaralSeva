import axios from "axios";
import React, { useContext } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmployeeContext } from "./context/EmployeeContext";
import { Link } from "react-router-dom";
import moment from "moment";

const Grievances = () => {
  const { grievance } = useContext(EmployeeContext);
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-orange-900 mb-6 jost">Assigned Grievances</h1>
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <Table>
          <TableCaption>A list of all grievances assigned to you.</TableCaption>
          <TableHeader className="bg-orange-900">
            <TableRow>
              <TableHead className="text-white font-semibold">Sl No</TableHead>
              <TableHead className="text-white font-semibold">Complainant</TableHead>
              <TableHead className="text-white font-semibold">Grievance No</TableHead>
              <TableHead className="text-white font-semibold">Applied On</TableHead>
              <TableHead className="text-white font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grievance && grievance.map((item, index) => (
              <TableRow key={item._id} className="hover:bg-orange-50/70">
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Link to={`/grievance/${item._id}`} className="font-semibold text-stone-800 hover:text-orange-700 hover:underline">
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell>{item.grievance_registered_number}</TableCell>
                <TableCell>{moment(item.createdAt).format("DD-MM-YYYY")}</TableCell>
                <TableCell>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full capitalize ${
                    item.status === 'pending' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                  }`}>
                    {item.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Grievances;