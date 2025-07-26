import React from "react";
import india from "./../assets/india.svg";
import { Phone } from "lucide-react";

const Topbar = () => {
  return (
    // Saffron gradient background with a bottom border for depth.
    <div className="flex justify-between w-full items-center p-2 text-white bg-gradient-to-r from-orange-500 to-amber-600 px-[5vw] shadow-md border-b-2 border-amber-800">
      <div className="flex items-center font-semibold text-white text-sm tracking-wider">
        <img src={india} alt="Indian Flag" className="mr-3 w-7 h-7 drop-shadow-md" />
        <span className="hidden md:inline">भारत सरकार | Government of India</span>
        <span className="md:hidden">भारत सरकार</span>
      </div>
      <div className="flex items-center gap-4 text-white text-sm">
       <span className="font-bold hidden sm:inline">सत्यमेव जयते</span>
       <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
        <Phone size={18} />
        <span className="font-semibold">9876543210</span>
       </div>
      </div>
    </div>
  );
};

export default Topbar;