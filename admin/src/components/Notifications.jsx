import React, { useContext } from "react";
import { AdminContext } from "./context/adminContext";
import moment from "moment";
import { Mail, MailCheck, Trash, BellOff } from "lucide-react";
import axios from "axios";
import { toast, Toaster } from "sonner";

const Notifications = () => {
  const { notifications, markAsRead, getNotification, getLimitNotifications } = useContext(AdminContext);

  const handleMarkAsRead = async (notificationId) => {
    await markAsRead(notificationId);
    getNotification();
    getLimitNotifications();
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await axios.post("http://localhost:5000/api/v1/notification/deleteNotification", { id });
      getNotification();
      toast.success("Notification deleted successfully");
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <Toaster position="top-center" richColors />
      <h1 className="text-3xl font-bold text-orange-900 mb-6 jost">Notification Center</h1>
      <div className="space-y-3">
        {notifications && notifications.length > 0 ? (
          notifications.map((data) => (
            <div
              key={data._id}
              onClick={() => handleMarkAsRead(data._id)}
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors duration-200 ${data.read ? 'bg-gray-50' : 'bg-amber-50 hover:bg-amber-100'}`}
            >
              <div className="flex items-start gap-4">
                {data.read ? <MailCheck className="w-8 h-8 mt-1 text-gray-400 flex-shrink-0" /> : <Mail className="w-8 h-8 mt-1 text-amber-600 flex-shrink-0" />}
                <div className={data.read ? "text-gray-500" : "text-black font-semibold"}>
                  <p>{data?.message}</p>
                  <span className="text-xs text-gray-400">{moment(data?.createdAt).fromNow()}</span>
                </div>
              </div>
              <button onClick={(e) => handleDelete(e, data._id)} className="p-2 rounded-full hover:bg-gray-200">
                <Trash className="w-5 h-5 text-gray-500 hover:text-red-600" />
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <BellOff className="w-24 h-24 text-gray-300"/>
            <h2 className="mt-4 text-2xl font-semibold text-gray-500">No Notifications Yet</h2>
            <p className="text-gray-400">New notifications will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;