import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, ArrowRightFromLine, CircleUserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const tooltipStyle = {
  backgroundColor: "#FF9933",
  color: "#1F2937",
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

// ✅ Theme toggle switch component
function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className={`relative w-16 h-8 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-orange-900 dark:focus:ring-offset-gray-900 ${
        darkMode ? "bg-gray-700" : "bg-amber-500"
      }`}
      aria-label="Toggle theme"
    >
      {/* Sun icon */}
      <span className="absolute left-1 text-yellow-300 text-lg select-none pointer-events-none">☀️</span>
      {/* Moon icon */}
      <span className="absolute right-1 text-gray-200 text-lg select-none pointer-events-none">🌙</span>
      {/* Toggle handle */}
      <span
        className={`bg-white w-7 h-7 rounded-full shadow-md transform transition-transform duration-300 ${
          darkMode ? "translate-x-8" : "translate-x-0"
        }`}
      />
    </button>
  );
}


const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const dropdownTrigger = document.querySelector("[data-dropdown-trigger]");
    if (dropdownTrigger) dropdownTrigger.blur();
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  const navLinkClasses =
    "relative font-medium text-orange-100 dark:text-orange-200 tracking-wide after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full hover:text-white dark:hover:text-amber-300";

  return (
    <div className="lg:px-[5vw] w-full flex justify-between items-center bg-orange-900/90 dark:bg-gray-900/90 backdrop-blur-lg text-white dark:text-white text-lg z-20 sticky top-0 h-20 shadow-lg border-b border-orange-800/50 dark:border-gray-700/50 md:px-4 px-3 transition-colors duration-500">
      <div className="flex items-center lg:gap-8 md:gap-4">
        <button
          className="lg:hidden p-2 rounded-md hover:bg-orange-800/70 dark:hover:bg-gray-700/50"
          onClick={toggleMenu}
        >
          <Menu className="h-7 w-7" />
        </button>

        {/* Desktop Links */}
        <Link to="/" className={`hidden lg:block ${navLinkClasses}`} data-tooltip-id="nav-home" data-tooltip-content="Go to Home Page">Home</Link>
        <Link to="/about" className={`hidden lg:block ${navLinkClasses}`} data-tooltip-id="nav-about" data-tooltip-content="Learn more About us">About</Link>
        <Link to="/schemes" className={`hidden lg:block ${navLinkClasses}`} data-tooltip-id="nav-schemes" data-tooltip-content="View Government Schemes">Schemes</Link>
        <Link to="/ask-saralseva" className={`hidden lg:block ${navLinkClasses}`} data-tooltip-id="nav-ai" data-tooltip-content="AI-Powered Scheme Recommender">Ask AI</Link>
        <Link to="/success-stories" className={`hidden lg:block ${navLinkClasses}`} data-tooltip-id="nav-success" data-tooltip-content="Read Success Stories">Success Stories</Link>
        <Link to="/dashboard" className={`hidden lg:block ${navLinkClasses}`} data-tooltip-id="nav-dashboard" data-tooltip-content="Go to Dashboard">Dashboard</Link>
        <Link to="/grievances" className={`hidden lg:block ${navLinkClasses}`} data-tooltip-id="nav-grievances" data-tooltip-content="View Grievances">Grievances</Link>
        <Link to="/contact" className={`hidden lg:block ${navLinkClasses}`} data-tooltip-id="nav-contact" data-tooltip-content="Contact Us">Contact</Link>
      </div>

      <div className="flex items-center gap-3 scale-[0.7] min-[280px]:scale-100">
        {/* Theme toggle switch */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </TooltipTrigger>
            <TooltipContent className="bg-orange-800 dark:bg-gray-800 text-white border-orange-700 dark:border-gray-700">
              <p>Switch theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {!isAuthenticated ? (
          <>
            {location.pathname !== "/login" && (
              <Link to="/login">
                <Button className="gap-2 font-bold text-orange-900 bg-amber-400 dark:bg-amber-300 rounded-full lg:px-6 hover:bg-white dark:hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-px">
                  <span className="hidden sm:inline">LOGIN</span>
                  {/* icon for small screens */}
                  <ArrowRightFromLine className="w-5 h-5 sm:hidden" />
                  {/* keep existing icon on large screens unchanged */}
                  <ArrowRightFromLine className="hidden w-5 h-5 sm:block" />
                </Button>
              </Link>
            )}
            {location.pathname !== "/register" && (
              <Link to="/register">
                <Button className="font-bold flex gap-1 items-center text-white bg-transparent border-2 border-amber-400 dark:border-amber-300 rounded-full lg:px-6 hover:bg-amber-400 dark:hover:bg-amber-300 hover:text-orange-900 transition-all duration-300">
                  <span className="hidden sm:inline">REGISTER</span>
                  {/* show user icon on small screens instead of text */}
                  <CircleUserRound className="w-5 h-5" />
                </Button>
              </Link>
            )}
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 rounded-full outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-orange-900 dark:focus:ring-offset-gray-900" data-dropdown-trigger>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleUserRound className="w-8 h-8 transition-colors duration-300 hover:text-amber-400 dark:hover:text-amber-300" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-orange-800 dark:bg-gray-800 text-white border-orange-700 dark:border-gray-700">
                    <p>My Account</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 bg-orange-900/95 dark:bg-gray-900/95 backdrop-blur-md text-white border-orange-800 dark:border-gray-700 w-56 transition-colors duration-500">
              <DropdownMenuLabel className="font-bold text-amber-400 dark:text-amber-300">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-orange-800 dark:bg-gray-700" />
              <Link to="/profile"><DropdownMenuItem className="cursor-pointer focus:bg-orange-800 dark:focus:bg-gray-700 focus:text-amber-400 dark:focus:text-amber-300">Profile</DropdownMenuItem></Link>
              <Link to="/schemeApplied"><DropdownMenuItem className="cursor-pointer focus:bg-orange-800 dark:focus:bg-gray-700 focus:text-amber-400 dark:focus:text-amber-300">Scheme Applied</DropdownMenuItem></Link>
              <Link to="/grievancesApplied"><DropdownMenuItem className="cursor-pointer focus:bg-orange-800 dark:focus:bg-gray-700 focus:text-amber-400 dark:focus:text-amber-300">Grievances</DropdownMenuItem></Link>
              <Link to="/status"><DropdownMenuItem className="cursor-pointer focus:bg-orange-800 dark:focus:bg-gray-700 focus:text-amber-400 dark:focus:text-amber-300">Status</DropdownMenuItem></Link>
              <DropdownMenuSeparator className="bg-orange-800 dark:bg-gray-700" />
              <DropdownMenuItem onClick={handleLogout} className="font-bold text-red-400 dark:text-red-300 cursor-pointer focus:bg-red-500/20 dark:focus:bg-red-700/20 focus:text-red-300 dark:focus:text-red-200">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 w-full bg-orange-900 dark:bg-gray-900 top-20 lg:hidden shadow-xl animate-in slide-in-from-top-4 transition-colors duration-500">
          <div className="flex flex-col p-4 gap-y-2">
            <Link to="/" className="block px-4 py-3 rounded-md hover:bg-orange-800/70 dark:hover:bg-gray-700/50" onClick={toggleMenu}>Home</Link>
            <Link to="/about" className="block px-4 py-3 rounded-md hover:bg-orange-800/70 dark:hover:bg-gray-700/50" onClick={toggleMenu}>About</Link>
            <Link to="/schemes" className="block px-4 py-3 rounded-md hover:bg-orange-800/70 dark:hover:bg-gray-700/50" onClick={toggleMenu}>Schemes</Link>
            <Link to="/ask-saralseva" className="block px-4 py-3 rounded-md hover:bg-orange-800/70 dark:hover:bg-gray-700/50" onClick={toggleMenu}>Ask AI</Link>
            <Link to="/success-stories" className="block px-4 py-3 rounded-md hover:bg-orange-800/70 dark:hover:bg-gray-700/50" onClick={toggleMenu}>Success Stories</Link>
            <Link to="/dashboard" className="block px-4 py-3 rounded-md hover:bg-orange-800/70 dark:hover:bg-gray-700/50" onClick={toggleMenu}>Dashboard</Link>
            <Link to="/grievances" className="block px-4 py-3 rounded-md hover:bg-orange-800/70 dark:hover:bg-gray-700/50" onClick={toggleMenu}>Grievances</Link>
            <Link to="/contact" className="block px-4 py-3 rounded-md hover:bg-orange-800/70 dark:hover:bg-gray-700/50" onClick={toggleMenu}>Contact</Link>
          </div>
        </div>
      )}

      {/* Tooltips */}
      <ReactTooltip id="nav-home" style={tooltipStyle} />
      <ReactTooltip id="nav-about" style={tooltipStyle} />
      <ReactTooltip id="nav-schemes" style={tooltipStyle} />
      <ReactTooltip id="nav-ai" style={tooltipStyle} />
      <ReactTooltip id="nav-success" style={tooltipStyle} />
      <ReactTooltip id="nav-dashboard" style={tooltipStyle} />
      <ReactTooltip id="nav-grievances" style={tooltipStyle} />
      <ReactTooltip id="nav-contact" style={tooltipStyle} />
    </div>
  );
};

export default Navbar;
