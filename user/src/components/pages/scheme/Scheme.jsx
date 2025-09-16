import React, { useEffect, useState } from "react";
import banner from "./../../../assets/inner-banner02.jpg";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link, useNavigate } from "react-router-dom";
import { Download, ExternalLink } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const tooltipStyle = {
  backgroundColor: "#FF9933", // orange theme
  color: "#1F2937", // dark text
  padding: "8px 12px",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: 500,
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  maxWidth: "220px",
  whiteSpace: "pre-line",
  zIndex: 9999,
};

const Scheme = () => {
  const [scheme, setScheme] = useState([]);
  const navigate = useNavigate();

  const listSchemes = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/schemes/list_scheme`
      );
      setScheme(res.data.products);
    } catch (error) {
      console.log(error, "Something went wrong");
    }
  };

  useEffect(() => {
    listSchemes();
  }, []);

  const handleSchemeForm = (scheme_name, scheme_code) => {
    navigate("/apply", { state: { scheme_name, scheme_code } });
  };

  const handleClick = (pdfUrl) => {
    window.open(pdfUrl, "_blank");
  };

  return (
          <Table>
            <TableHeader className="bg-gradient-to-r from-violet-900 via-purple-900 to-indigo-900 dark:from-gray-800">
              <TableRow>

              </TableRow>
            </TableHeader>
            <TableBody>
              {scheme.map((item, index) => (

                    >
                      {item?.scheme_name}
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Scheme Code: {item?.scheme_code}</p>
                  </TableCell>

                    </button>
                    <Tooltip
                      id={`apply-tooltip-${index}`}
                      place="top"
                      style={tooltipStyle}
                    />
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
