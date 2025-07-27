import React, { useContext } from "react";
import moment from "moment";
import { Mail, MailCheck, Trash, BellOff } from "lucide-react";
import { EmployeeContext } from "./context/EmployeeContext";
import axios from "axios";
import no_notification from "./../assets/a-well-designed-flat-icon-of-no-notification-yet-vector.jpg";

const Notifications = () => {
  const { notifications, markAsRead, getNotification } = useContext(EmployeeContext);

  const handleMarkAsRead = async (notificationId) => {
    await markAsRead(notificationId);
    getNotification();
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Prevent handleMarkAsRead from firing
    try {
      await axios.post("${import.meta.env.VITE_API_BASE_URL}/api/v1/notification/deleteNotification", { id });
      getNotification();
    } catch (error) {
      console.error("Failed to delete notification", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
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
                {data.read ? (
                  <MailCheck className="w-8 h-8 mt-1 text-gray-400 flex-shrink-0" />
                ) : (
                  <Mail className="w-8 h-8 mt-1 text-amber-600 flex-shrink-0" />
                )}
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