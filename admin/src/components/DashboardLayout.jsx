import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu, LayoutDashboard, BookCopy, BookPlus, Megaphone, UsersRound, FileCheck, ShieldAlert, Bell, MessagesSquare } from "lucide-react";
import logo from './../assets/emblem.svg';

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const baseLinkClasses = "flex items-center w-full gap-3 px-4 py-3 rounded-lg transition-colors duration-200";
  const inactiveLinkClasses = "text-orange-100/80 hover:bg-orange-800/60 hover:text-white";
  const activeLinkClasses = "bg-amber-500 text-orange-900 font-bold shadow-inner";

  const navLinks = [
    { to: "/dashboard", icon: <LayoutDashboard />, label: "DASHBOARD" },
    { to: "/schemes", icon: <BookCopy />, label: "SCHEMES" },
    { to: "/add_scheme", icon: <BookPlus />, label: "ADD SCHEME" },
    { to: "/announcement", icon: <Megaphone />, label: "ANNOUNCEMENT" },
    { to: "/employees", icon: <UsersRound />, label: "EMPLOYEES" },
    { to: "/tickets", icon: <FileCheck />, label: "TICKETS" },
    { to: "/grievances", icon: <ShieldAlert />, label: "GRIEVANCES" },
    { to: "/message", icon: <MessagesSquare />, label: "MESSAGE" },
    { to: "/notifications", icon: <Bell />, label: "NOTIFICATIONS" },
  ];

  return (
    <div className="flex flex-col h-screen lg:flex-row bg-orange-50/40">
      <div className="w-full bg-orange-900 text-white lg:w-[15vw] lg:fixed lg:h-screen h-auto p-2 lg:p-4 z-40 shadow-xl flex flex-col">
        <div className="flex justify-between items-center lg:flex-col lg:items-start lg:gap-4 flex-shrink-0">
            <div className="flex items-center gap-3 lg:mb-4">
                <img src={logo} alt="SaralSeva Logo" className="w-8 h-8"/>
                <span className="text-xl font-bold text-white jost">Admin Panel</span>
            </div>
            <button className="p-2 rounded-md lg:hidden hover:bg-orange-800" onClick={toggleSidebar}>
              <Menu className="w-6 h-6" />
            </button>
        </div>
        <nav className={`mt-6 overflow-y-auto ${isOpen ? "block" : "hidden"} lg:block`}>
          <ul className="space-y-2">
            {navLinks.map(link => (
              <li key={link.to}>
                <NavLink to={link.to} end className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
                  {link.icon} {link.label}
                </NavLink>
              </li>
            ))}
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