import React, { useState } from "react";
import { Button } from "./ui/button";
import { Menu, ArrowRightFromLine, CircleUserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

  // Common class for Nav Links for DRY principle
  const navLinkClasses = "relative font-medium text-orange-100 tracking-wide after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full hover:text-white";
  
  return (
    <div className="lg:px-[5vw] w-full flex justify-between items-center bg-orange-900/90 backdrop-blur-lg text-white text-lg z-20 sticky top-0 h-20 shadow-lg border-b border-orange-800/50 md:px-4 px-3">
      <div className="flex items-center lg:gap-8 md:gap-4">
        <button className="lg:hidden p-2 rounded-md hover:bg-orange-800/70" onClick={toggleMenu}>
          <Menu className="h-7 w-7" />
        </button>
        {/* Desktop Links */}
        <Link to="/" className={`hidden lg:block ${navLinkClasses}`}>Home</Link>
        <Link to="/about" className={`hidden lg:block ${navLinkClasses}`}>About</Link>
        <Link to="/schemes" className={`hidden lg:block ${navLinkClasses}`}>Schemes</Link>
        <Link to="/dashboard" className={`hidden lg:block ${navLinkClasses}`}>Dashboard</Link>
        <Link to="/grievances" className={`hidden lg:block ${navLinkClasses}`}>Grievances</Link>
        <Link to="/contact" className={`hidden lg:block ${navLinkClasses}`}>Contact</Link>
      </div>

      <div className="flex items-center gap-3">
        {!isAuthenticated ? (
          <>
            {location.pathname !== "/login" && (
              <Link to="/login">
                <Button className="gap-2 font-bold text-orange-900 bg-amber-400 rounded-full lg:px-6 hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-px">
                  LOGIN <ArrowRightFromLine className="hidden w-5 h-5 lg:block" />
                </Button>
              </Link>
            )}
            {location.pathname !== "/register" && (
              <Link to="/register">
                <Button className="font-bold text-white bg-transparent border-2 border-amber-400 rounded-full lg:px-6 hover:bg-amber-400 hover:text-orange-900 transition-all duration-300">
                  REGISTER
                </Button>
              </Link>
            )}
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 rounded-full outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-orange-900">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleUserRound className="w-8 h-8 transition-colors duration-300 hover:text-amber-400" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-orange-800 text-white border-orange-700">
                    <p>My Account</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 bg-orange-900/95 backdrop-blur-md text-white border-orange-800 w-56">
              <DropdownMenuLabel className="font-bold text-amber-400">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-orange-800" />
              <Link to='/profile'><DropdownMenuItem className="cursor-pointer focus:bg-orange-800 focus:text-amber-400">Profile</DropdownMenuItem></Link>
              <Link to='/schemeApplied'><DropdownMenuItem className="cursor-pointer focus:bg-orange-800 focus:text-amber-400">Scheme Applied</DropdownMenuItem></Link>
              <Link to='/grievancesApplied'><DropdownMenuItem className="cursor-pointer focus:bg-orange-800 focus:text-amber-400">Grievances</DropdownMenuItem></Link>
              <Link to='/status'><DropdownMenuItem className="cursor-pointer focus:bg-orange-800 focus:text-amber-400">Status</DropdownMenuItem></Link>
              <DropdownMenuSeparator className="bg-orange-800" />
              <DropdownMenuItem onClick={handleLogout} className="font-bold text-red-400 cursor-pointer focus:bg-red-500/20 focus:text-red-300">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 w-full bg-orange-900 top-20 lg:hidden shadow-xl animate-in slide-in-from-top-4">
            <div className="flex flex-col p-4 gap-y-2">
                <Link to="/" className="block px-4 py-3 rounded-md hover:bg-orange-800/70" onClick={toggleMenu}>Home</Link>
                <Link to="/about" className="block px-4 py-3 rounded-md hover:bg-orange-800/70" onClick={toggleMenu}>About</Link>
                <Link to="/schemes" className="block px-4 py-3 rounded-md hover:bg-orange-800/70" onClick={toggleMenu}>Schemes</Link>
                <Link to="/dashboard" className="block px-4 py-3 rounded-md hover:bg-orange-800/70" onClick={toggleMenu}>Dashboard</Link>
                <Link to="/grievances" className="block px-4 py-3 rounded-md hover:bg-orange-800/70" onClick={toggleMenu}>Grievances</Link>
                <Link to="/contact" className="block px-4 py-3 rounded-md hover:bg-orange-800/70" onClick={toggleMenu}>Contact</Link>
            </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;