import React, { createContext, useContext } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminContext } from "./context/adminContext";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Employees = () => {
  const { employees } = useContext(AdminContext);
  console.log(employees);
  return (
    <div>
      <h1>Employees</h1>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sl No</TableHead>
            <TableHead>Employee Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="">Phone No</TableHead>
            <TableHead className="">Employee ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees?.map((employee, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Link
                  to={`/employee/${employee._id}`}
                  className="hover:underline"
                >
                  {employee.name}
                </Link>
              </TableCell>
              <Link to={`/employee/${employee._id}`}><TableCell>{employee.email}</TableCell></Link>
              <TableCell>{employee.mobile}</TableCell>
              <TableCell>{employee.empId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Employees;
