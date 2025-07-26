import React, { useContext, useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EmployeeContext } from './context/EmployeeContext'
import { Link } from 'react-router-dom'

const Tickets = () => {
  const { tickets, getAllSchemes } = useContext(EmployeeContext)

  useEffect(() => {
    getAllSchemes()
  }, [])
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-orange-900 mb-6 jost">Scheme Application Tickets</h1>
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <Table>
          <TableCaption>A list of all scheme application tickets assigned to you.</TableCaption>
          <TableHeader className="bg-orange-900">
            <TableRow>
              <TableHead className="text-white font-semibold">Applicant Name</TableHead>
              <TableHead className="text-white font-semibold">Email</TableHead>
              <TableHead className="text-white font-semibold">Scheme Name</TableHead>
              <TableHead className="text-white font-semibold">Registration No</TableHead>
              <TableHead className="text-white font-semibold">Status</TableHead>
              <TableHead className="text-white font-semibold">Ticket Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets && tickets?.map((ticket) => (
              <TableRow key={ticket._id} className="hover:bg-orange-50/70">
                <TableCell>
                  <Link to={`/ticket/${ticket?._id}`} className='font-semibold text-stone-800 hover:text-orange-700 hover:underline'>
                    {ticket?.name}
                  </Link>
                </TableCell>
                <TableCell>{ticket?.email}</TableCell>
                <TableCell>{ticket?.scheme_name}</TableCell>
                <TableCell>{ticket?.registration_no}</TableCell>
                <TableCell>
                  <span className="font-semibold capitalize">{ticket?.initial_status}</span>
                </TableCell>
                <TableCell>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${ticket?.initial_status === 'pending' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {ticket?.initial_status === 'pending' ? 'Open' : 'Closed'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Tickets