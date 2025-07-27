import React, { useState } from "react";
import user from "./../../../assets/user.svg";
import admin from "./../../../assets/admin.svg";
import employee from "./../../../assets/employee.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  const [chooseLogin, setChooseLogin] = useState("");

  const cardBaseClasses = "relative w-48 h-48 flex flex-col items-center justify-center p-4 rounded-2xl shadow-lg cursor-pointer transition-all duration-300";
  const cardSelectedClasses = "transform -translate-y-2 shadow-2xl border-4 border-amber-500";
  const imageBaseClasses = "w-24 h-24 transition-all duration-300";
  const imageSelectedClasses = "grayscale-0";
  const imageUnselectedClasses = "grayscale opacity-60 hover:opacity-100";
  const buttonLinkClasses = 'inline-block px-8 mt-2 text-xl text-center uppercase bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-px transition-all py-3';

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-10 bg-orange-50/30">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-orange-900 jost">Choose Your Login Type</h1>
        <p className="mt-2 text-lg text-gray-600">
          Please select the type of account you wish to access.
        </p>
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-10 mt-12">
        <div className={`${cardBaseClasses} ${chooseLogin === "user" ? cardSelectedClasses : 'hover:shadow-xl'}`} onClick={() => setChooseLogin("user")}>
          <img src={user} alt="User Login" className={`${imageBaseClasses} ${chooseLogin === 'user' ? imageSelectedClasses : imageUnselectedClasses}`} />
          <h2 className={`mt-2 text-xl font-bold ${chooseLogin === 'user' ? 'text-orange-800' : 'text-gray-700'}`}>User</h2>
        </div>
        <div className={`${cardBaseClasses} ${chooseLogin === "admin" ? cardSelectedClasses : 'hover:shadow-xl'}`} onClick={() => setChooseLogin("admin")}>
          <img src={admin} alt="Admin Login" className={`${imageBaseClasses} ${chooseLogin === 'admin' ? imageSelectedClasses : imageUnselectedClasses}`} />
          <h2 className={`mt-2 text-xl font-bold ${chooseLogin === 'admin' ? 'text-orange-800' : 'text-gray-700'}`}>Admin</h2>
        </div>
        <div className={`${cardBaseClasses} ${chooseLogin === "employee" ? cardSelectedClasses : 'hover:shadow-xl'}`} onClick={() => setChooseLogin("employee")}>
          <img src={employee} alt="Employee Login" className={`${imageBaseClasses} w-28 h-28 ${chooseLogin === 'employee' ? imageSelectedClasses : imageUnselectedClasses}`} />
          <h2 className={`mt-2 text-xl font-bold ${chooseLogin === 'employee' ? 'text-orange-800' : 'text-gray-700'}`}>Employee</h2>
        </div>
      </div>

      <div className="mt-8 h-24 flex flex-col items-center justify-center">
        {chooseLogin === "user" && (
          <Link to='/userlogin' className="text-center animate-in fade-in duration-500">
            <p className="text-gray-500">Only for Registered Users</p>
            <Button className='px-8 mt-2 text-xl uppercase bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-px transition-all'>User Login</Button>
          </Link>
        )}

        {chooseLogin === "admin" && (
          <div className="text-center animate-in fade-in duration-500">
            <p className="text-gray-500">Only for Administrative Staff</p>
            <a href={import.meta.env.VITE_ADMIN_URL} className={buttonLinkClasses}>
              Admin Login
            </a>
          </div>
        )}

        {chooseLogin === "employee" && (
          <div className="text-center animate-in fade-in duration-500">
            <p className="text-gray-500">Only for Employed Personnel</p>
            <a href={import.meta.env.VITE_EMPLOYEE_URL} className={buttonLinkClasses}>
              Employee Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;