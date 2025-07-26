import React, { useContext } from "react";
import logo from "./../assets/emblem.svg";
import { CircleUserRound, Mail, MailCheck, Send } from "lucide-react";
import { EmployeeContext } from "./context/EmployeeContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import notification_icon from "./../assets/notification.png";
import { Link } from "react-router-dom";
import moment from "moment";
import { Toaster, toast } from "sonner";

const Header = () => {
  const { isAuthenticated, logoutEmployee, getNotification, limitNotification, notificationCount, markAsRead, getLimitNotifications } = useContext(EmployeeContext);

  const handleLogout = () => {
    logoutEmployee();
    toast.success("Logout successful", {
      style: { background: '#166534', color: 'white', border: 'none' },
    });
  };

  const handleMarkAsRead = async (notificationId) => {
    await markAsRead(notificationId);
    getNotification();
    getLimitNotifications();
  };

  return (
    <div className="px-[1vw] sm:px-[2vw] py-2 w-full sticky top-0 z-50 bg-white shadow-md">
      <Toaster position="top-center" richColors />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-8 lg:w-12" />
          <div>
            <h1 className="text-2xl text-orange-900 md:text-xl jost lg:text-4xl font-extrabold">
              SaralSeva
            </h1>
            <p className="hidden text-gray-500 lg:block">
              Simplified Work Based Accounting Application for Panchayati Raj
            </p>
          </div>
        </div>
  
        {isAuthenticated && (
          <div className="flex items-center gap-4 sm:gap-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/messages" className="relative p-2 rounded-full hover:bg-gray-100">
                    <Send className="w-7 h-7 text-stone-700" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Messages</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Popover>
              <PopoverTrigger className="relative p-2 rounded-full hover:bg-gray-100">
                <img src={notification_icon} alt="Notifications" className="w-7 h-7" />
                {notificationCount > 0 && 
                  <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-600 rounded-full -right-1 -top-1">
                    {notificationCount}
                  </span>
                }
              </PopoverTrigger>
              <PopoverContent className="w-80 mt-2">
                <div className="p-2 space-y-2">
                  <h3 className="font-bold">Notifications</h3>
                  {limitNotification.length > 0 ? (
                    <div>
                      {limitNotification.map((data) => (
                        <div key={data._id} onClick={() => handleMarkAsRead(data._id)} className="p-2 rounded-md cursor-pointer hover:bg-gray-100">
                          <div className="flex items-start gap-3">
                            {data.read ? <MailCheck className="w-8 h-8 mt-1 text-gray-400" /> : <Mail className="w-8 h-8 mt-1 text-amber-600" />}
                            <div className={`${data.read ? "text-gray-500" : "text-black"}`}>
                              {data?.message}
                              <p className="mt-1 text-xs text-gray-400">{moment(data?.createdAt).fromNow()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Link to="/notifications" className="block pt-2 mt-2 text-sm font-semibold text-center text-orange-700 border-t hover:underline">View All Notifications</Link>
                    </div>
                  ) : <p className="text-sm text-gray-500">No new notifications.</p>}
                </div>
              </PopoverContent>
            </Popover>
  
            <DropdownMenu>
              <DropdownMenuTrigger className="p-1 rounded-full outline-none focus:ring-2 focus:ring-amber-500">
                <CircleUserRound className="w-9 h-9 text-stone-700" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to='/profile'><DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem></Link>
                <DropdownMenuItem onClick={handleLogout} className="font-bold text-red-600 cursor-pointer focus:bg-red-100 focus:text-red-700">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;