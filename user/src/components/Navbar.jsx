import React, { useState } from "react";
import { Button } from "./ui/button";
import { Menu, ArrowRightFromLine, CircleUserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// Keep your custom tooltip import if needed for user icon
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Rename react-tooltip import to avoid conflict
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


const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  const navLinkClasses = "relative font-semibold text-white/90 dark:text-white/90 tracking-wide after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-violet-400 after:to-indigo-400 after:transition-all after:duration-300 hover:after:w-full hover:text-white dark:hover:text-white hover:scale-105 transition-all duration-300";

  return (
    <div className="lg:px-[5vw] w-full flex justify-between items-center bg-gradient-to-r from-violet-900/95 via-purple-900/95 to-indigo-900/95 dark:from-gray-900/95 dark:via-gray-800/95 dark:to-gray-900/95 backdrop-blur-xl text-white dark:text-white text-lg z-20 sticky top-0 h-20 shadow-modern border-b border-violet-500/30 dark:border-gray-700/50 md:px-4 px-3 transition-all duration-500">
      <div className="flex items-center lg:gap-8 md:gap-4">
        <button className="lg:hidden p-2 rounded-lg hover:bg-violet-800/70 dark:hover:bg-gray-700/50 transition-all duration-300" onClick={toggleMenu}>
          <Menu className="h-7 w-7" />
        </button>
        {/* Desktop Links */}
        <Link
          to="/"
          className={`hidden lg:block ${navLinkClasses}`}
          data-tooltip-id="nav-home"
          data-tooltip-content="Go to Home Page"
        >
          Home
        </Link>

        <Link to="/about" className={`hidden lg:block ${navLinkClasses}`} data-tooltip-id="nav-about" data-tooltip-content="Learn more About us">About</Link>
        <Link to="/schemes" className={`hidden lg:block ${navLinkClasses}`} data-tooltip-id="nav-schemes" data-tooltip-content="View Government Schemes">Schemes</Link>
        <Link to="/dashboard" className={`hidden lg:block ${navLinkClasses}`} data-tooltip-id="nav-dashboard" data-tooltip-content="Go to Dashboard">Dashboard</Link>
        <Link to="/grievances" className={`hidden lg:block ${navLinkClasses}`} data-tooltip-id="nav-grievances" data-tooltip-content="View Grievances">Grievances</Link>
        <Link to="/contact" className={`hidden lg:block ${navLinkClasses}`} data-tooltip-id="nav-contact" data-tooltip-content="Contact Us">Contact</Link>

      </div>

      <div className="flex items-center gap-3">
        {!isAuthenticated ? (
          <>
            {location.pathname !== "/login" && (
              <Link to="/login">
                <Button className="gap-2 font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 rounded-full lg:px-6 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105">
                  LOGIN <ArrowRightFromLine className="hidden w-5 h-5 lg:block" />
                </Button>
              </Link>
            )}
            {location.pathname !== "/register" && (
              <Link to="/register">
                <Button className="font-bold text-white bg-transparent border-2 border-violet-400 dark:border-violet-300 rounded-full lg:px-6 hover:bg-violet-600 dark:hover:bg-violet-500 hover:text-white transition-all duration-300 hover:scale-105">
                  REGISTER
                </Button>
              </Link>
            )}
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 rounded-full outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-orange-900 dark:focus:ring-offset-gray-900">
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
            <DropdownMenuContent className="mt-2 bg-violet-900/95 dark:bg-gray-900/95 backdrop-blur-md text-white border-violet-700 dark:border-gray-700 w-56 transition-colors duration-500 shadow-modern">
              <DropdownMenuLabel className="font-bold text-violet-300 dark:text-violet-300">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-violet-700 dark:bg-gray-700" />
              <Link to='/profile'><DropdownMenuItem className="cursor-pointer focus:bg-violet-800 dark:focus:bg-gray-700 focus:text-violet-300 dark:focus:text-violet-300">Profile</DropdownMenuItem></Link>
              <Link to='/schemeApplied'><DropdownMenuItem className="cursor-pointer focus:bg-violet-800 dark:focus:bg-gray-700 focus:text-violet-300 dark:focus:text-violet-300">Scheme Applied</DropdownMenuItem></Link>
              <Link to='/grievancesApplied'><DropdownMenuItem className="cursor-pointer focus:bg-violet-800 dark:focus:bg-gray-700 focus:text-violet-300 dark:focus:text-violet-300">Grievances</DropdownMenuItem></Link>
              <Link to='/status'><DropdownMenuItem className="cursor-pointer focus:bg-violet-800 dark:focus:bg-gray-700 focus:text-violet-300 dark:focus:text-violet-300">Status</DropdownMenuItem></Link>
              <DropdownMenuSeparator className="bg-violet-700 dark:bg-gray-700" />
              <DropdownMenuItem onClick={handleLogout} className="font-bold text-red-400 dark:text-red-300 cursor-pointer focus:bg-red-500/20 dark:focus:bg-red-700/20 focus:text-red-300 dark:focus:text-red-200">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 w-full bg-gradient-to-b from-violet-900/95 to-purple-900/95 dark:from-gray-900/95 dark:to-gray-800/95 backdrop-blur-xl top-20 lg:hidden shadow-modern animate-in slide-in-from-top-4 transition-all duration-500">
          <div className="flex flex-col p-4 gap-y-2">

        </div>
      )}
      {/* Place after the entire navbar */}
<ReactTooltip id="nav-home" style={tooltipStyle} />
<ReactTooltip id="nav-about" style={tooltipStyle} />
<ReactTooltip id="nav-schemes" style={tooltipStyle} />
<ReactTooltip id="nav-dashboard" style={tooltipStyle} />
<ReactTooltip id="nav-grievances" style={tooltipStyle} />
<ReactTooltip id="nav-contact" style={tooltipStyle} />

    </div>
  );
};

export default Navbar;
