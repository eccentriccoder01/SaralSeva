import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [user, setUser] = useState([]);
  const [isAuthenticated,setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated"))
  const getUser = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/user/getSingleUser/${id}`
      );
      console.log(res)
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user)

  useEffect(() => {
    if (isAuthenticated && id) {
      getUser(id);
    }
  }, [isAuthenticated, id]); 

  return (
    <UserContext.Provider value={{ token, user, getUser, id }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
