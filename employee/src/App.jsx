
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Header from "./components/Header";
import DashboardLayout from "./components/DashboardLayout";
import { useContext } from "react";
import { EmployeeContext } from "./components/context/EmployeeContext";
import Grievances from "./components/Grievances";
import Tickets from "./components/Tickets";
import SingleTicket from "./components/SingleTicket";
import Profile from "./components/Profile";
import SingleGrievance from "./components/SingleGrievance";
import Notifications from "./components/Notifications";
import Message from "./components/Message";
import NotFound from "./components/NotFound";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(EmployeeContext);
  
  if (isAuthenticated && localStorage.getItem("token")) {
    return children;
  }
  return <Navigate to="/login" />;
};

function App() {
  const { isAuthenticated } = useContext(EmployeeContext);
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={isAuthenticated && token ? <Navigate to="/" /> : <Register />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} /> {/* Default route */}
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/ticket/:id" element={<SingleTicket />} />
          <Route path="/grievances" element={<Grievances />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/grievance/:id" element={<SingleGrievance/>}/>
          <Route path='/notifications' element={<Notifications/>}/>
          <Route path='/messages' element={<Message/>}/>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
