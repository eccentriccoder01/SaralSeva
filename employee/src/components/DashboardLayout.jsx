import { Menu } from "lucide-react";
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from './../assets/emblem.svg';

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const baseLinkClasses = "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200";
  const inactiveLinkClasses = "text-orange-100/80 hover:bg-orange-800/60 hover:text-white";
  const activeLinkClasses = "bg-amber-500 text-orange-900 font-bold shadow-inner";

  return (
    <div className="flex flex-col h-screen lg:flex-row bg-orange-50/40">
      <div className="w-full bg-orange-900 text-white lg:w-[15vw] lg:fixed lg:h-screen h-auto p-2 lg:p-4 z-40 shadow-xl">
        <div className="flex justify-between items-center lg:flex-col lg:items-start lg:gap-4">
            <div className="flex items-center gap-3 lg:mb-4">
                <img src={logo} alt="SaralSeva Logo" className="w-8 h-8"/>
                <span className="text-xl font-bold text-white jost">Employee Portal</span>
            </div>
            <button className="p-2 rounded-md lg:hidden hover:bg-orange-800" onClick={toggleSidebar}>
              <Menu className="w-6 h-6" />
            </button>
        </div>
        <nav className={`mt-6 ${isOpen ? "block" : "hidden"} lg:block`}>
          <ul className="space-y-2">
            <li><NavLink to="/" end className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>Dashboard</NavLink></li>
            <li><NavLink to="/tickets" className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>Tickets</NavLink></li>
            <li><NavLink to="/grievances" className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>Grievances</NavLink></li>
            <li><NavLink to="/messages" className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>Message</NavLink></li>
            <li><NavLink to="/notifications" className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>Notifications</NavLink></li>
          </ul>
        </nav>
      </div>
      <main className="flex-1 lg:ml-[15vw] p-4 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;