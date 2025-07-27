import React, { useEffect, useState } from "react";
import banner from "./../../../assets/inner-banner02.jpg";
import pdf from "./../../../assets/pdf.svg";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import click_here from "./../../../assets/click-here.gif";
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
    <div className="bg-orange-50/30">
      <div className="relative flex items-center justify-center h-48 bg-cover bg-center" style={{ backgroundImage: `url(${banner})` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative text-5xl font-extrabold text-white jost tracking-wider">Government Schemes</h1>
      </div>
      <div className="px-[5vw] py-10">
        <h2 className="text-3xl font-bold text-orange-900 mb-6">Available Schemes & Programmes</h2>
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-lg">
          <Table>
            <TableHeader className="bg-orange-900">
              <TableRow>
                <TableHead className="w-[100px] text-white font-semibold">Sl No</TableHead>
                <TableHead className="text-white font-semibold">Title</TableHead>
                <TableHead className="text-white font-semibold">Brochure</TableHead>
                <TableHead className="text-white font-semibold text-right">Apply Now</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheme.map((item, index) => (
                <TableRow key={index} className="bg-white hover:bg-orange-50/70">
                  <TableCell className="font-medium text-gray-700">{index + 1}</TableCell>
                  <TableCell>
                    <Link to={`/scheme/${item._id}`} className='font-semibold text-lg text-stone-800 hover:text-orange-700 hover:underline'>
                      {item?.scheme_name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Download className="w-8 h-8 text-red-700 cursor-pointer transition-transform hover:scale-110" onClick={() => handleClick(item?.scheme_brochure)} />
                  </TableCell>
                  <TableCell className="text-right">
                    <button onClick={() => handleSchemeForm(item?.scheme_name, item?.scheme_code)} className="flex items-center gap-2 ml-auto font-bold text-orange-800 transition-transform rounded-full hover:scale-105">
                        Apply <ExternalLink size={20}/>
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