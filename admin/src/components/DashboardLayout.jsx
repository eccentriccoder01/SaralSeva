
import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Menu, LayoutDashboard, BookCopy, BookPlus, Megaphone, UsersRound, FileCheck, ShieldAlert, Bell, MessagesSquare } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex flex-col h-screen lg:flex-row">
      <div className="w-full bg-green-900 text-white lg:w-[15vw] block fixed lg:h-screen h-auto p-2 lg:p-0 z-50">
        <button className="block lg:hidden" onClick={toggleSidebar}>
          <Menu className="w-6 h-6" />
        </button>
        <nav className={`mt-4 ${isOpen ? "block" : "hidden"} lg:block`}>
          <ToggleGroup type="single">
            <ul>
              <li>
                <Link to="/dashboard" className="block px-4 py-2 rounded">
                  <ToggleGroupItem
                    value="dashboard"
                    className="flex justify-start w-full gap-2 hover:bg-green-800 rounded-0 hover:text-white"
                  >
                    <LayoutDashboard /> DASHBOARD
                  </ToggleGroupItem>
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="block px-4 py-2 rounded">
                  <ToggleGroupItem
                    value="scheme"
                    className="flex justify-start w-full gap-2 hover:bg-green-800 rounded-0 hover:text-white"
                  >
                    <BookCopy /> SCHEME
                  </ToggleGroupItem>
                </Link>
              </li>
              <li>
                <Link to="/add_scheme" className="block px-4 py-2 rounded">
                  <ToggleGroupItem
                    value="add scheme"
                    className="flex justify-start w-full gap-2 hover:bg-green-800 rounded-0 hover:text-white"
                  >
                    <BookPlus /> ADD SCHEME
                  </ToggleGroupItem>
                </Link>
              </li>
              <li>
                <Link to="/announcement" className="block px-4 py-2 rounded">
                  <ToggleGroupItem
                    value="announcement"
                    className="flex justify-start w-full gap-2 hover:bg-green-800 rounded-0 hover:text-white"
                  >
                    <Megaphone /> ANNOUNCEMENT
                  </ToggleGroupItem>
                </Link>
              </li>
              <li>
                <Link to="/employees" className="block px-4 py-2 rounded">
                  <ToggleGroupItem
                    value="employees"
                    className="flex justify-start w-full gap-2 hover:bg-green-800 rounded-0 hover:text-white"
                  >
                    <UsersRound /> EMPLOYEES
                  </ToggleGroupItem>
                </Link>
              </li>
              <li>
                <Link to="/tickets" className="block px-4 py-2 rounded">
                  <ToggleGroupItem
                    value="tickets"
                    className="flex justify-start w-full gap-2 hover:bg-green-800 rounded-0 hover:text-white"
                  >
                    <FileCheck /> TICKETS
                  </ToggleGroupItem>
                </Link>
              </li>
              <li>
                <Link to="/grievances" className="block px-4 py-2 rounded">
                  <ToggleGroupItem
                    value="grievances"
                    className="flex justify-start w-full gap-2 hover:bg-green-800 rounded-0 hover:text-white"
                  >
                    <ShieldAlert /> GRIEVANCES
                  </ToggleGroupItem>
                </Link>
              </li>
              <li>
                <Link to="/message" className="block px-4 py-2 rounded">
                  <ToggleGroupItem
                    value="message"
                    className="flex justify-start w-full gap-2 hover:bg-green-800 rounded-0 hover:text-white"
                  >
                    <MessagesSquare /> MESSAGE
                  </ToggleGroupItem>
                </Link>
              </li>
              <li>
                <Link to="/notifications" className="block px-4 py-2 rounded">
                  <ToggleGroupItem
                    value="notifications"
                    className="flex justify-start w-full gap-2 hover:bg-green-800 rounded-0 hover:text-white"
                  >
                    <Bell /> NOTIFICATIONS
                  </ToggleGroupItem>
                </Link>
              </li>
            </ul>
          </ToggleGroup>
        </nav>
      </div>
      <div className="flex-1 lg:ml-[15vw] p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
