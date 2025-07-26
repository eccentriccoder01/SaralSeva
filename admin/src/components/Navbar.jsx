import React from "react";
import { Button } from "./ui/button";
import { ArrowRightFromLine, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";




const Navbar = () => {
  const location = useLocation();
  return (
    <div className="px-[5vw] py-2  w-full flex justify-between items-center bg-green-900 text-white text-xl gap-5   z-10 sticky top-0 left-0 h-16">
      <div className="flex gap-5">
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/add_scheme">
          <p>Add Scheme</p>
        </Link>
        <p>Dashboard</p>
        <p>Gallery</p>
        <p>Grievances</p>
        <p>FAQs</p>
        <p>Contact Us</p>
      </div>
      <div className="flex gap-4">
        {location.pathname === "/login" ||
        location.pathname === "/userlogin" ? (
          <></>
        ) : (
          <Link to="/login">
            <Button className="gap-2 px-5 text-xl bg-green-500 hover:bg-white hover:text-black">
              LOGIN <ArrowRightFromLine />
            </Button>
          </Link>
        )}
        {location.pathname === "/register" ? (
          <></>
        ) : (
          <Link to="/register">
            <Button className="text-xl bg-transparent hover:bg-white hover:text-black">
              REGISTER
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
