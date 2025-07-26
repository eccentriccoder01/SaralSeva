import React, { useContext } from "react";
import { AdminContext } from "./context/adminContext";
import moment from "moment";
import { Mail, MailCheck, Trash } from "lucide-react";
import axios from "axios";
import { toast , Toaster } from "sonner";



const Notifications = () => {
  const { notifications, markAsRead, getNotification, getLimitNotifications } =
    useContext(AdminContext);

  const handleMarkAsRead = async (notificationId) => {
    await markAsRead(notificationId);
    getNotification();
    getLimitNotifications();
  };

  const handleDelete = async (id) => {
    console.log("delete initiated");
    console.log(id);
    await axios
      .post("http://localhost:5000/api/v1/notification/deleteNotification", {id})
      .then((res) => {
        getNotification();
        toast(
          <div className="w-full p-4 text-white bg-green-900 rounded-lg">
            <h1 className="text-md">Notification deleted successfully</h1>
          </div>
        );
        console.log("delete completed");
      });
  };

  return (
    <div className="pt-10 lg:pt-0">
      <Toaster/>
      <h1 className="my-3 text-xl text-semibold">Notification Center</h1>
      {notifications && notifications?.length > 0 ? (
        <div  >
          {notifications?.map((data, index) => (
            <div
              key={index}
              onClick={() => handleMarkAsRead(data._id)}
              className="flex items-center lg:justify-between p-2 cursor-pointer hover:bg-gray-100 lg:w-[75%] border-b border-gray-200 w-[100%]"
            >
              <p className="flex items-start gap-2 ">
                {" "}
                {data.read ? (
                  <MailCheck className="w-8 lg:w-20" />
                ) : (
                  <Mail className="w-8 lg:w-20" />
                )}
                <span
                  className={`items-center flex gap-4  justify-between  ${
                    data.read ? "text-gray-500" : "text-black"
                  }`}
                >
                  {data?.message}{" "}
                </span>
                <span className="mt-1 text-gray-400 float-end">
                    {moment(data?.createdAt).fromNow()}
                  </span>
              </p>
              <Trash className="w-20 cursor-pointer text-black-700 lg:w-20"  onClick={() => handleDelete(data._id)}/>
            </div>
          ))}
        </div>
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
};

export default Notifications;
