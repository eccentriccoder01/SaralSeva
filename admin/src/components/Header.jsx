import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/emblem.svg";
import { CircleUserRound, Mail, MailCheck, Send } from "lucide-react";
import notification_icon from "../assets/notification.png";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AdminContext } from "./context/adminContext";
import moment from "moment";
import { Link } from "react-router-dom";
import { toast, Toaster } from "sonner";
import axios from "axios";
import S from './../../../S.png';

const Header = () => {
  const { isAuthenticated, notificationCount, limitNotification, markAsRead, getNotification, getLimitNotifications, logout, id: receiver } = useContext(AdminContext);
  const [newMessages, setNewMessages] = useState([]);

  const handleMarkAsRead = async (notificationId) => {
    await markAsRead(notificationId);
    getNotification();
    getLimitNotifications();
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Logout successful");
  };

  useEffect(() => {
    const getNewMessages = async () => {
      if (!receiver) return;
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/messages/getNewMessages`, { receiver });
        setNewMessages(res.data.messages);
      } catch (error) { console.error("Failed to fetch new messages", error); }
    };
    getNewMessages();
  }, [receiver]);

  return (
    <div className="px-[1vw] py-2 w-full sticky top-0 z-50 bg-white shadow-md">
      <Toaster position="top-center" richColors />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-8 lg:w-12" />
          <div>
          <Link className="navbar-brand" to="/">
              <span className="flex items-center text-3xl lg:text-5xl font-extrabold text-orange-900 tracking-tight jost h-10">
                  <img
                      src={S}
                      alt="S"
                      style={{
                          height: '3.5rem',
                          marginRight: '-12px',
                          transform: 'translateY(-2px)' 
                      }}
                  />
                  aralSeva
              </span>
          </Link>
            <p className="hidden text-gray-500 lg:block">Simplified Work Based Accounting Application for Panchayati Raj</p>
          </div>
        </div>
  
        {isAuthenticated && (
          <div className="flex items-center gap-4 sm:gap-6">
            <Popover>
              <PopoverTrigger className="relative p-2 rounded-full hover:bg-gray-100"><Send className="w-7 h-7 text-stone-700" /></PopoverTrigger>
              <PopoverContent className="w-80 mt-2">
                <div className="p-2 space-y-2">
                  <h3 className="font-bold">New Messages</h3>
                  {newMessages?.length > 0 ? (
                    <div>
                      {newMessages.map((data) => (
                        <div key={data._id} className="p-2 rounded-md hover:bg-gray-100">
                          <p className="font-semibold">{data.sender.name}</p>
                          <p className="text-gray-500 truncate">{data.message}</p>
                        </div>
                      ))}
                      <Link to='/message'><p className="pt-2 mt-2 text-sm font-semibold text-center text-orange-700 border-t hover:underline">View All Messages</p></Link>
                    </div>
                  ) : <p className="text-sm text-gray-500">No new messages.</p>}
                </div>
              </PopoverContent>
            </Popover>
  
            <Popover>
              <PopoverTrigger className="relative p-2 rounded-full hover:bg-gray-100">
                <img src={notification_icon} alt="Notifications" className="w-7 h-7" />
                {notificationCount > 0 && <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-600 rounded-full -right-1 -top-1">{notificationCount}</span>}
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
                <Link to="/profile"><DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem></Link>
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