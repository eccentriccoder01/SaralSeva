import React, { useState, useEffect } from "react";
import india from "./../assets/india.svg";
import { Phone, Sun, Moon } from "lucide-react";

const Topbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Persist theme in localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  return (
    <div
      className={`flex justify-between w-full items-center p-2 px-[5vw] shadow-md border-b-2 transition-colors duration-500
        ${darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-gradient-to-r from-orange-500 to-amber-600 border-amber-800 text-white"}
      `}
    >
      <div className="flex items-center font-semibold text-sm tracking-wider">
        <img src={india} alt="Indian Flag" className="mr-3 w-7 h-7 drop-shadow-md" />
        <span className="hidden md:inline">भारत सरकार | Government of India</span>
        <span className="md:hidden">भारत सरकार</span>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span className="font-bold hidden sm:inline">सत्यमेव जयते</span>
        <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
          <Phone size={18} />
          <span className="font-semibold">9876543210</span>
        </div>
        {/* Theme toggle button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
};

export default Topbar;
