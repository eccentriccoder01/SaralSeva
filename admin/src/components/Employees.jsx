import React, { useContext } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminContext } from "./context/adminContext";
import { Link } from "react-router-dom";

const Employees = () => {
  const { employees } = useContext(AdminContext);
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-orange-900 mb-6 jost">Manage Employees</h1>
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <Table>
          <TableCaption>A list of all registered employees.</TableCaption>
          <TableHeader className="bg-orange-900">
            <TableRow>
              <TableHead className="text-white font-semibold">Sl No</TableHead>
              <TableHead className="text-white font-semibold">Employee Name</TableHead>
              <TableHead className="text-white font-semibold">Email</TableHead>
              <TableHead className="text-white font-semibold">Phone No</TableHead>
              <TableHead className="text-white font-semibold">Employee ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees?.map((employee, index) => (
              <TableRow key={index} className="hover:bg-orange-50/70">
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Link to={`/employee/${employee._id}`} className="font-semibold text-stone-800 hover:text-orange-700 hover:underline">
                    {employee.name}
                  </Link>
                </TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.mobile}</TableCell>
                <TableCell>{employee.empId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Employees;