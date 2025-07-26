import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from './context/adminContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import pdf from '../assets/pdf.svg';
import { Link } from 'react-router-dom';

const Schemes = () => {
  
  const {scheme} = useContext(AdminContext)

  return (
    <div className='pt-10 lg:pt-0'>
      {scheme.length > 0 ? (
          <Table>
          <TableHeader className="hover:bg-black">
            <TableRow className="bg-green-900 hover:bg-green-900">
              <TableHead className="w-[100px] text-white">Sl No</TableHead>
              <TableHead className="text-white">Title</TableHead>
              <TableHead className="text-white">Brochure</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheme.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
               <Link to={`/scheme/${item._id}`}> <TableCell className='md:text-xl sm:text-md hover:underline'>{item?.scheme_name}</TableCell></Link>
                <TableCell>
                  <img
                    src={pdf}
                    alt=""
                    className="w-10 cursor-pointer"
                    onClick={() => handleClick(item?.scheme_brochure)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No schemes available</p>
      )}
    </div>
  );
};

export default Schemes;

