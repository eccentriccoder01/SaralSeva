import React, { useState, useEffect } from "react";
import india from "./../assets/india.svg";
import { Phone, Sun, Moon } from "lucide-react";
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

const Topbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Initialize from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Apply theme whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) onSearch(value); // pass query up if needed
  };

  return (
    <div
      className={`flex justify-between w-full items-center p-2 px-[5vw] shadow-md border-b-2 transition-colors duration-500
        ${
          darkMode
            ? "bg-gray-900 border-gray-700 text-white"
            : "bg-gradient-to-r from-orange-500 to-amber-600 border-amber-800 text-white"
        }
      `}
    >
      <div className="flex items-center font-semibold text-sm tracking-wider">
        <img src={india} alt="Indian Flag" className="mr-3 w-7 h-7 drop-shadow-md" />
        <span className="hidden md:inline">भारत सरकार | Government of India</span>
        <span className="md:hidden">भारत सरकार</span>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span className="font-bold hidden sm:inline">सत्यमेव जयते</span>

        {/* ✅ Search bar */}
        <input
          type="text"
          placeholder="Search..."
          className={`ml-4 p-2 rounded-md border w-48
  ${darkMode 
    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400" 
    : "bg-white border-gray-300 text-black placeholder-gray-500"
  }
  focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-600 transition-colors`}
          value={searchQuery}
          onChange={handleSearchChange}
        />

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

        {/* Theme toggle with tooltip */}
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="ml-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          data-tooltip-id="theme-tooltip"
          data-tooltip-content="Switch between Light and Dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <Tooltip id="theme-tooltip" place="bottom" style={tooltipStyle} />
      </div>
    </div>
  );
};

export default Topbar;
