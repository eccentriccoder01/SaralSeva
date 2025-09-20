import axios from "axios";
import { createContext, useEffect, useState } from "react";

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token")
  );
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(() => localStorage.getItem("id"));
  const [tickets, setTickets] = useState([]);
  const [singleTicket, setSingleTicket] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [limitNotification, setLimitNotification] = useState([]);
  const [notificationCount, setNotificationCount] = useState();
  const [grievance, setGrievance] = useState([]);
  const [singleGrievance, setSingleGrievance] = useState([]);
  const [performance, setPerformance] = useState([{}]);
  const [grievancePerformance, setGrievancePerformance] = useState([{}]);
  const [uniqueRecipients, setUniqueRecipients] = useState([{}]);
  let [overallPerformance, setOverallPerformance] = useState([
    {
      total: "",
      close: "",
      open: "",
    },
  ]);

  const loginEmployee = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/employee/login`,
        {
          email,
          password,
        }
      );

      const { token, employee, id } = response.data;

      if (response.data.message === "Employee logged in successfully") {
        setToken(token);
        localStorage.setItem("token", token);
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
      const errorMessage = error.response?.data?.message || "An error occurred";
      setError(errorMessage);
      setIsAuthenticated(false);
      setToken(null);
      setName(null);
      setId(null);
      return false;
    }
  };

  const logoutEmployee = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setError(null);
    setToken(null);
    setIsAuthenticated(false);
    setId(null);
    setEmployee([]);
    setPerformance([{}]);
  };

  const getEmployee = async (id) => {
    try {
      await axios
        .get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/employee/getSingleEmployee/${localStorage.getItem(
            "id"
          )}`
        )
        .then((res) => {
          setEmployee(res.data.employee);
        });
    } catch (error) {
      // Error handling without console.log in production
    }
  };

  const getAllSchemes = async (req, res) => {
    try {
      await axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/scheme/getAllSchemes`)
        .then((res) => {
          const filteredTickets = res.data.schemes.filter(
            (ticket) => ticket.assigned_to._id === id
          );
          setTickets(filteredTickets);
        });
    } catch (error) {
      // Error handling without console.log in production
    }
  };

  useEffect(() => {
    getAllSchemes();
  }, []);

  const getSingleAppliedScheme = async (id) => {
    try {
      await axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/scheme/getSingleScheme/${id}`)
        .then((res) => {
          setSingleTicket(res.data.appliedScheme);
        });
    } catch (error) {
      // Error handling without console.log in production
    }
  };

  useEffect(() => {
    getSingleAppliedScheme();
  }, []);

 

  const getNotification = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/notification/getEmployeeNotifications`
      );
      const filteredNotifications = res.data.notifications.filter(
        (notification) => notification.recipientId._id === id
      );
      setNotifications(filteredNotifications);
      const filterNotificationCount = res.data.notifications.filter(
        (notification) =>
          notification.recipientId._id === id && !notification.read
      );
      setNotificationCount(filterNotificationCount.length);
    } catch (error) {
      // Error handling without console.log in production
    }
  };

  useEffect(() => {
    getNotification();
  }, []);


  const getLimitNotifications = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/notification/getLimitEmployeeNotifications`,{id}
      );

      setLimitNotification(res.data.notifications);
      
      const filterNotificationCount = res.data.notifications.filter(
        (notification) =>
          notification.recipientId._id === id && !notification.read
      );
      setNotificationCount(filterNotificationCount.length);
    } catch (error) {
      // Error handling without console.log in production
    }
  }

  useEffect(() => {
    getLimitNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      await axios
        .post("${import.meta.env.VITE_API_BASE_URL}/api/v1/notification/markAsRead", {
          notificationId,
        })
        .then((res) => {
          getNotification();
        });
    } catch (error) {
      // Error handling without console.log in production
    }
  };

  useEffect(() => {
    markAsRead();
  }, []);

  const employeePerformance = async (id) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/employee/employeePerformance`,
      { id }
    );
    // return res.data.data
    setPerformance(res.data.data);
  };

  useEffect(() => {
    employeePerformance(id);
  }, []);

  const getAllGrievance = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/grievances/getAllGrievance`)
        .then((res) => {
          const filteredGrievance = res.data.grievance.filter(
            (grievance) => grievance.assigned_to._id === id
          );
          setGrievance(filteredGrievance);
        });
    } catch (error) {
      // Error handling without console.log in production
    }
  };

  useEffect(() => {
    getAllGrievance();
  }, []);

  const getSingleGrievance = async (id) => {
    try {
      await axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/grievances/getSingleGrievance/${id}`)
        .then((res) => {
          setSingleGrievance(res.data.grievance);
        });
    } catch (error) {
      // Error handling without console.log in production
    }
  };

  useEffect(() => {
    getSingleGrievance(id);
  }, []);

  const employeeGreivancePerformance = async (id) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/employee/employeeGrievancePerformance`,
      { id }
    );
    setGrievancePerformance(res.data.data);
  };

  useEffect(() => {
    employeeGreivancePerformance(id);
  }, []);

  const overallEmployeePerformance = async () => {
    const total = performance[0].total + grievancePerformance[0].total;
    const close = performance[0].close + grievancePerformance[0].close;
    const open = performance[0].open + grievancePerformance[0].open;
    const progress = (close / total) * 100;
    setOverallPerformance = [
      {
        total: total,
        close: close,
        open: open,
      },
    ];
  };

  useEffect(() => {
    overallEmployeePerformance;
  }, []);

  const getUniqueRecipientsWithLatestMessage = async () => {
    const sender = id;
    const senderType = "employee";
    try {
      await axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/messages/getUniqueRecipientsWithLatestMessageForEmployee`,
          { sender, senderType }
        )
        .then((res) => {
          setUniqueRecipients(res.data.recipients);
        });
    } catch (error) {
      // Error handling without console.log in production
    }
  };

  useEffect(() => {
    getUniqueRecipientsWithLatestMessage();
  }, []);





  useEffect(() => {
    if (isAuthenticated && id) {
      getEmployee(id); // Fetch employee data when authenticated and id is available
      getAllSchemes();
      getSingleAppliedScheme();
      markAsRead();
      getNotification();
      getAllGrievance();
      getSingleGrievance();
      employeePerformance(id);
      employeeGreivancePerformance(id);
      getLimitNotifications()
      getUniqueRecipientsWithLatestMessage()
    }
  }, [isAuthenticated, id]); // Dependencies include isAuthenticated and id

  return (
    <EmployeeContext.Provider
      value={{
        loginEmployee,
        getEmployee,
        error,
        token,
        isAuthenticated,
        employee,
        loading,
        logoutEmployee,
        id,
        tickets,
        singleTicket,
        getSingleAppliedScheme,
        getAllSchemes,
        getNotification,
        notifications,
        notificationCount,
        markAsRead,
        employeePerformance,
        performance,
        getAllGrievance,
        grievance,
        getSingleGrievance,
        singleGrievance,
        grievancePerformance,
        employeeGreivancePerformance,
        overallEmployeePerformance,
        overallPerformance,
        getLimitNotifications,
        limitNotification,
        getUniqueRecipientsWithLatestMessage,
        uniqueRecipients
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeContext, EmployeeProvider };
