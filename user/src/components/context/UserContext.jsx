import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [user, setUser] = useState(null); // null initially
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // Fetch user by ID
  const getUser = useCallback(async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/getSingleUser/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated && id) {
      getUser(id);
    }
  }, [isAuthenticated, id, getUser]);

  return (
    <UserContext.Provider value={{ token, user, getUser, id, isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
