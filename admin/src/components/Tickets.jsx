import React, { useContext, useEffect } from "react";
import { AdminContext } from "./context/adminContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useNavigate } from "react-router-dom";

const Tickets = () => {
  const { tickets , getAllSchemes  } = useContext(AdminContext);

  useEffect(()=>{
    getAllSchemes()
  },[])
  
  return (
    <div className="pt-10 lg:pt-0" >
      <h1>Employees</h1>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sl No</TableHead>
            <TableHead> Name</TableHead>
            <TableHead>Scheme Name</TableHead>
            <TableHead>Scheme Code</TableHead>
            <TableHead>Registration Number</TableHead>
            <TableHead className="">Assigned To</TableHead>
            <TableHead className="">Employee ID</TableHead>
            <TableHead className="">Initial Status</TableHead>
            <TableHead className="">Remark</TableHead>
            <TableHead className="">Final Status</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets?.map((ticket, index) => (
            <TableRow key={index} className={`${ticket.final_status==='pending' ? "text-blue-700":"" || ticket.final_status==='approved' ? "text-green-700":"" || ticket.final_status==='rejected' ? "text-red-700":""}`}>
              <TableCell>{index + 1}</TableCell>
              <TableCell >
                <Link to={`/ticket/${ticket?._id}`} className="hover:underline">{ticket?.name}</Link>
              </TableCell>
              <TableCell>{ticket?.scheme_name}</TableCell>
              <TableCell>{ticket?.scheme_code}</TableCell>
              <TableCell>{ticket?.registration_no}</TableCell>
              <TableCell>{ticket?.assigned_to?.name || ""}</TableCell>
              <TableCell>{ticket?.assigned_to?.empId}</TableCell>
              <TableCell>{ticket?.initial_status}</TableCell>
              <TableCell>{ticket?.remarks??"NA"}</TableCell>
              <TableCell className='font-bold'>{ticket?.final_status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Tickets;
