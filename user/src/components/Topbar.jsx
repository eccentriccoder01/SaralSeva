import React from "react";
import india from "./../assets/india.svg";
import { Phone } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// Tooltip style (same as Footer)
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

const Topbar = () => {
  return (
    <div
      className={`flex justify-between w-full items-center p-2 px-[5vw] shadow-md border-b-2 transition-colors duration-500
        bg-gradient-to-r from-orange-500 to-amber-600 border-amber-800 text-white
      `}
    >
      <div className="flex items-center font-semibold text-sm tracking-wider">
        <img src={india} alt="Indian Flag" className="mr-3 w-7 h-7 drop-shadow-md" />
        <span className="hidden md:inline">भारत सरकार | Government of India</span>
        <span className="md:hidden">भारत सरकार</span>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span className="font-bold hidden sm:inline">सत्यमेव जयते</span>

        {/* Phone with tooltip */}
        <a
          href="tel:9876543210"
          className="flex items-center gap-2 hover:scale-105 transition-transform duration-300"
          data-tooltip-id="phone-tooltip"
          data-tooltip-content="Click to call the helpline"
        >
          <Phone size={18} />
          <span className="font-semibold">9876543210</span>
        </a>
        <Tooltip id="phone-tooltip" place="bottom" style={tooltipStyle} />
      </div>
    </div>
  );
};

export default Topbar;
