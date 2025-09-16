import React, { useEffect, useState } from "react";
import banner from "./../../../assets/inner-banner02.jpg";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link, useNavigate } from "react-router-dom";
import { Download, ExternalLink } from "lucide-react";

const Scheme = () => {
  const [scheme, setScheme] = useState([]);
  const navigate = useNavigate();

  const listSchemes = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/schemes/list_scheme`);
      setScheme(res.data.products);
    } catch (error) {
      console.log(error, "Something went wrong");
    }
  };

  useEffect(() => {
    listSchemes();
  }, []);

  const handleSchemeForm = (scheme_name, scheme_code) => {
    navigate('/apply', { state: { scheme_name, scheme_code } });
  };

  const handleClick = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      <div className="relative flex items-center justify-center h-64 bg-cover bg-center" style={{ backgroundImage: `url(${banner})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        <div className="relative text-center">
          <h1 className="text-6xl font-black text-white jost tracking-wider mb-4">Government Schemes</h1>
          <p className="text-xl text-gray-200">Discover and apply for schemes that empower you</p>
        </div>
      </div>
      <div className="px-[5vw] py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-gradient jost mb-4">Available Schemes & Programmes</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our comprehensive collection of government initiatives designed to support and empower citizens
          </p>
        </div>
        <div className="overflow-hidden border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-modern bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <Table>
            <TableHeader className="bg-gradient-to-r from-violet-900 via-purple-900 to-indigo-900 dark:from-gray-800">
              <TableRow>
                <TableHead className="w-[100px] text-white font-bold text-center">#</TableHead>
                <TableHead className="text-white font-bold">Scheme Details</TableHead>
                <TableHead className="text-white font-bold text-center">Document</TableHead>
                <TableHead className="text-white font-bold text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheme.map((item, index) => (
                <TableRow key={index} className="bg-white/60 dark:bg-gray-800/60 hover:bg-gradient-to-r hover:from-violet-50/50 hover:to-purple-50/50 dark:hover:from-violet-900/20 dark:hover:to-purple-900/20 transition-all duration-300 group">
                  <TableCell className="font-bold text-gray-700 dark:text-gray-200 text-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full flex items-center justify-center mx-auto">
                      {index + 1}
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <Link 
                      to={`/scheme/${item._id}`} 
                      className='font-bold text-xl text-gray-800 dark:text-white hover:text-gradient transition-all duration-300 group-hover:scale-105 inline-block'
                    >
                      {item?.scheme_name}
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Scheme Code: {item?.scheme_code}</p>
                  </TableCell>
                  <TableCell className="text-center">
                    <button 
                      onClick={() => handleClick(item?.scheme_brochure)} 
                      className="group/btn p-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
                    >
                      <Download className="w-6 h-6 group-hover/btn:animate-bounce" />
                    </button>
                  </TableCell>
                  <TableCell className="text-center">
                    <button 
                      onClick={() => handleSchemeForm(item?.scheme_name, item?.scheme_code)} 
                      className="group/apply flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 mx-auto"
                    >
                      Apply Now 
                      <ExternalLink size={18} className="group-hover/apply:translate-x-1 transition-transform duration-300"/>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Scheme;
