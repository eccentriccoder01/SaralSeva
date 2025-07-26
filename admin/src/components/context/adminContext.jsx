import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [singleEmployee, setSingleEmployee] = useState();
  const [scheme, setScheme] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("tokenAdmin"));
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("tokenAdmin")
  );
  const [admin, setAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(() => localStorage.getItem("id"));
  const [tickets, setTickets] = useState([]);
  const [singleTicket, setSingleTicket] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [limitNotification, setLimitNotification] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [grievance, setGrievance] = useState([]);
  const [singleGrievance, setSingleGrievance] = useState([]);
  const [uniqueRecipients, setUniqueRecipients] = useState([{}]);
  const [totalSchemeProgress, setTotalProgress] = useState(0);
  const [totalApprovedScheme, setTotalApprovedScheme] = useState(0);
  const [totalPendingScheme, setTotalPendingScheme] = useState(0);
  const [totalRejectedScheme, setTotalRejectedScheme] = useState(0);
  const [totalGrievance, setTotalGrievance] = useState(0);
  const [totalOpenGrievance, setOpenGrievance] = useState(0);
  const [totalCloseGrievance, setCloseGrievance] = useState(0);


  const login = async (formData) => {
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/admin/loginAdmin",
        formData
      );

      console.log(response);

      const { token, admin, id } = response.data;

      if (response.data.success) {
        setToken(token);
        localStorage.setItem("tokenAdmin", token);
        setIsAuthenticated(true);
        setError(null);
        localStorage.setItem("id", id);
        setId(id);
        return true;
      } else {
        setError(response.data.message);
        setIsAuthenticated(false);
        setToken(null);
        setId(null);
        return false;
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "An error occurred";
      setError(errorMessage);
      setIsAuthenticated(false);
      setToken(null);
      setId(null);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("tokenAdmin");
    localStorage.removeItem("id");
    setError(null);
    setToken(null);
    setIsAuthenticated(false);
    setId(null);
  };

  const getSingleAdmin = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/admin/getSingleAdmin/${id}`
      );
      console.log(res);
      setAdmin(res.data.admin);
    } catch (error) {
      console.error(error);
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    getSingleAdmin();
  }, []);

  const getEmployees = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/employee/getEmployees"
      );
      console.log(res);
      setEmployees(res.data.employees);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const getSingleEmployee = async (id) => {
    try {
      await axios
        .get(`http://localhost:5000/api/v1/employee/getSingleEmployee/${id}`)
        .then((res) => {
          console.log(res);
          setSingleEmployee(res.data.employee);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleEmployee();
  }, []);

  const listSchemes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/schemes/list_scheme"
      );
      if (res.data && Array.isArray(res.data.products)) {
        setScheme(res.data.products);
      } else {
        console.error(
          "API response does not contain products array:",
          res.data
        );
      }
    } catch (error) {
      console.error(error);
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    listSchemes();
  }, []);

  const getAllSchemes = async (req, res) => {
    try {
      await axios
        .get("http://localhost:5000/api/v1/user/scheme/getAllSchemes")
        .then((res) => {
          console.log(res);
          setTickets(res.data.schemes);
          let approved = 0;
          let pending = 0;
          let rejected = 0;
          setTotalProgress(res.data.schemes.length);
          res.data.schemes.filter((ticket) => {
            if (ticket.final_status === "approved") {
              approved++;
            } else if (ticket.final_status === "pending") {
              pending++;
            } else if (ticket.final_status === "rejected") {
              rejected++;
            }
          });
          setTotalApprovedScheme(approved);
          setTotalPendingScheme(pending);
          setTotalRejectedScheme(rejected);
        });
    } catch (error) {
      console.log(error);
    }
  };
 

  useEffect(() => {
    getAllSchemes();
  }, []);

  const getSingleAppliedScheme = async (id) => {
    try {
      await axios
        .get(`http://localhost:5000/api/v1/user/scheme/getSingleScheme/${id}`)
        .then((res) => {
          console.log(res);
          setSingleTicket(res.data.appliedScheme);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleAppliedScheme();
  }, []);

  const getLimitNotifications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/notification/getLimitAdminNotifications"
      );
      setLimitNotification(res.data.notifications);
    } catch (error) {}
  };

  useEffect(() => {
    getLimitNotifications();
  }, []);

  const getNotification = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/notification/getAdminNotifications"
      );
      console.log(res , localStorage.getItem("id"))
      const filteredNotifications = res.data?.notifications?.filter(
        (notification) => notification?.recipientId?._id === localStorage.getItem("id")
      );
      console.log(filteredNotifications)
      setNotifications(filteredNotifications);
      const filterNotificationCount = res.data.notifications.filter(
        (notification) =>
          notification.recipientId._id === id && !notification.read
      );
      console.log(filterNotificationCount);
      setNotificationCount(filterNotificationCount.length);
      console.log(notificationCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotification();
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      await axios
        .post("http://localhost:5000/api/v1/notification/markAsRead", {
          notificationId,
        })
        .then((res) => {
          getNotification();
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    markAsRead();
  }, []);

  const getAllGrievance = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/grievances/getAllGrievance"
      );
      console.log(res);
      setGrievance(res.data.grievance);
      setTotalGrievance(res.data.grievance.length);
      let open = 0;
      let closed = 0;
      res.data.grievance.filter((grievance) => {
        if (grievance.status === "pending") {
          open++;
        } else {
          closed++;
        }
      });
      setOpenGrievance(open);
      setCloseGrievance(closed);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllGrievance();
  }, []);



  const progress = () => {
    let total = totalGrievance + totalSchemeProgress;
    let close = totalCloseGrievance + totalApprovedScheme + totalRejectedScheme; 
    let open = totalOpenGrievance + totalPendingScheme;
    let progress = ((close / total) * 100).toFixed(2);
    let data = [{
      total: total,
      close: close,
      open: open,
      progress: progress
    }]
    return data;
  }

  const getSingleGrievance = async (id) => {
    try {
      await axios
        .get(`http://localhost:5000/api/v1/grievances/getSingleGrievance/${id}`)
        .then((res) => {
          console.log(res);
          setSingleGrievance(res.data.grievance);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleGrievance(id);
  }, []);

  const getUniqueRecipientsWithLatestMessage = async () => {
    const sender = id;
    const senderType = "Admin";
    try {
      await axios
        .post(
          "http://localhost:5000/api/v1/messages/getUniqueRecipientsWithLatestMessage",
          { sender, senderType }
        )
        .then((res) => {
          console.log(res);
          setUniqueRecipients(res.data.recipients);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUniqueRecipientsWithLatestMessage();
  }, []);

  useEffect(() => {
    if (isAuthenticated && id) {
      getSingleAdmin(id); // Fetch employee data when authenticated and id is available
      getAllSchemes();
      getSingleAppliedScheme();
      markAsRead();
      getNotification();
      getLimitNotifications();
      getAllGrievance();
      getSingleGrievance();
      getSingleEmployee();
      getUniqueRecipientsWithLatestMessage();
    }
  }, [isAuthenticated, id]); // Dependencies include isAuthenticated and id

  return (
    <AdminContext.Provider
      value={{
        login,
        isAuthenticated,
        token,
        error,
        id,
        employees,
        scheme,
        tickets,
        singleTicket,
        getAllSchemes,
        getSingleAppliedScheme,
        admin,
        notifications,
        notificationCount,
        markAsRead,
        limitNotification,
        getLimitNotifications,
        getNotification,
        grievance,
        getAllGrievance,
        singleGrievance,
        getSingleGrievance,
        singleEmployee,
        getSingleEmployee,
        getUniqueRecipientsWithLatestMessage,
        uniqueRecipients,
        logout,
        totalApprovedScheme,
        totalPendingScheme,
        totalRejectedScheme,
        totalSchemeProgress,
        progress,
        totalOpenGrievance,
        totalCloseGrievance
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminProvider };
