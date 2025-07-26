import React, { useContext } from 'react';
import { AdminContext } from './context/adminContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const Schemes = () => {
  const { scheme } = useContext(AdminContext);
  
  const handleClick = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className='bg-white p-6 rounded-2xl shadow-lg'>
      <h1 className="text-3xl font-bold text-orange-900 mb-6 jost">Manage Schemes</h1>
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        {scheme.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="bg-orange-900 hover:bg-orange-900">
                <TableHead className="w-[100px] text-white">Sl No</TableHead>
                <TableHead className="text-white">Title</TableHead>
                <TableHead className="text-white text-center">Brochure</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheme.map((item, index) => (
                <TableRow key={index} className="hover:bg-orange-50/70">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <Link to={`/scheme/${item._id}`} className='font-semibold text-lg text-stone-800 hover:text-orange-700 hover:underline'>
                        {item?.scheme_name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">
                    <button onClick={() => handleClick(item?.scheme_brochure)} className="p-2 transition-colors rounded-full hover:bg-gray-200">
                      <Download className="w-6 h-6 text-red-700"/>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-xl text-gray-500 py-20">No schemes available.</p>
        )}
      </div>
    </div>
  );
};

export default Schemes;