// App.js
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css"; // Make sure this includes Tailwind styles
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import AddScheme from "./components/AddScheme";
import Schemes from "./components/Schemes";
import DashboardLayout from "./components/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import Employees from "./components/Employees";
import Announcement from "./components/Announcement";
import Grievances from "./components/Grievances";
import Tickets from "./components/Tickets";
import SingleTicket from "./components/SingleTicket";
import { AdminContext } from "./components/context/adminContext";
import Notifications from "./components/Notifications";
import SingleEmployee from "./components/SingleEmployee";
import Profile from "./components/Profile";
import SingleGrievance from "./components/SingleGrievance";
import Message from "./components/Message";
import SingleScheme from "./components/SingleScheme";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated ,token} = useContext(AdminContext);
  
  if (isAuthenticated && token) {
    return children;
  }
  return <Navigate to="/login" />;
};

function App() {
  const {isAuthenticated , token} = useContext(AdminContext)
  

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={isAuthenticated && token?<Navigate to="/" />: <Login  />} />
        <Route path="/register" element={isAuthenticated && token?<Navigate to="/" />:<Register />} />

        <Route path="/" element={
          <ProtectedRoutes>
            <DashboardLayout />
          </ProtectedRoutes>
        }>
          <Route index element={<Dashboard />} />
          <Route path="/add_scheme" element={<AddScheme />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/schemes" element={<Schemes/>} />
          <Route path="/scheme/:id" element={<SingleScheme/>} />
          <Route path="/employees" element={<Employees/>} />
          <Route path="/announcement" element={<Announcement/>} />
          <Route path="/grievances" element={<Grievances/>} />
          <Route path="/tickets" element={<Tickets/>} />
          <Route path="/ticket/:id" element={<SingleTicket/>} />
          <Route path="/notifications" element={<Notifications/>} />
          <Route path="/employee/:id" element={<SingleEmployee/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/grievance/:id' element={<SingleGrievance/>}/>
          <Route path='/message' element={<Message/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
