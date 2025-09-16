import React, { useState } from "react";
import user from "./../../../assets/user.svg";
import admin from "./../../../assets/admin.svg";
import employee from "./../../../assets/employee.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  const [chooseLogin, setChooseLogin] = useState("");

  const cardBaseClasses = "relative w-56 h-56 flex flex-col items-center justify-center p-6 rounded-3xl shadow-lg cursor-pointer transition-all duration-500 group";
  const cardSelectedClasses = "transform -translate-y-3 shadow-2xl border-4 border-violet-500 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20";
  const imageBaseClasses = "w-28 h-28 transition-all duration-500 group-hover:scale-110";
  const imageSelectedClasses = "grayscale-0";
  const imageUnselectedClasses = "grayscale opacity-60 hover:opacity-100 group-hover:grayscale-0";
  const buttonLinkClasses = 'inline-block px-8 mt-4 text-xl text-center uppercase bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 py-3';

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-black text-gradient jost mb-4">Choose Your Login Type</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Please select the type of account you wish to access. 
          <span className="text-gradient-secondary font-semibold"> Digital India</span> services await you.
        </p>
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-12">
        <div className={`${cardBaseClasses} ${chooseLogin === "user" ? cardSelectedClasses : 'hover:shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'}`} onClick={() => setChooseLogin("user")}>
          <div className="relative">
            <img src={user} alt="User Login" className={`${imageBaseClasses} ${chooseLogin === 'user' ? imageSelectedClasses : imageUnselectedClasses}`} />
            {chooseLogin === 'user' && <div className="absolute -top-2 -right-2 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center"><span className="text-white text-sm">✓</span></div>}
          </div>
          <h2 className={`mt-4 text-2xl font-bold ${chooseLogin === 'user' ? 'text-gradient' : 'text-gray-700 dark:text-gray-300'}`}>Citizen</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Access government services</p>
        </div>
        <div className={`${cardBaseClasses} ${chooseLogin === "admin" ? cardSelectedClasses : 'hover:shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'}`} onClick={() => setChooseLogin("admin")}>
          <div className="relative">
            <img src={admin} alt="Admin Login" className={`${imageBaseClasses} ${chooseLogin === 'admin' ? imageSelectedClasses : imageUnselectedClasses}`} />
            {chooseLogin === 'admin' && <div className="absolute -top-2 -right-2 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center"><span className="text-white text-sm">✓</span></div>}
          </div>
          <h2 className={`mt-4 text-2xl font-bold ${chooseLogin === 'admin' ? 'text-gradient' : 'text-gray-700 dark:text-gray-300'}`}>Administrator</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Manage system operations</p>
        </div>
        <div className={`${cardBaseClasses} ${chooseLogin === "employee" ? cardSelectedClasses : 'hover:shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'}`} onClick={() => setChooseLogin("employee")}>
          <div className="relative">
            <img src={employee} alt="Employee Login" className={`${imageBaseClasses} ${chooseLogin === 'employee' ? imageSelectedClasses : imageUnselectedClasses}`} />
            {chooseLogin === 'employee' && <div className="absolute -top-2 -right-2 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center"><span className="text-white text-sm">✓</span></div>}
          </div>
          <h2 className={`mt-4 text-2xl font-bold ${chooseLogin === 'employee' ? 'text-gradient' : 'text-gray-700 dark:text-gray-300'}`}>Employee</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Government staff portal</p>
        </div>
      </div>

      <div className="mt-12 h-32 flex flex-col items-center justify-center">
        {chooseLogin === "user" && (
          <Link to='/userlogin' className="text-center animate-in fade-in duration-500 group">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Access citizen services and government schemes</p>
            <Button className='px-12 py-4 text-xl uppercase bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 group-hover:shadow-2xl'>
              <span className="flex items-center gap-2">
                Citizen Login 
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </Button>
          </Link>
        )}

        {chooseLogin === "admin" && (
          <div className="text-center animate-in fade-in duration-500 group">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Administrative control panel and system management</p>
            <a href={import.meta.env.VITE_ADMIN_URL} className={buttonLinkClasses}>
              <span className="flex items-center gap-2">
                Admin Portal 
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </a>
          </div>
        )}

        {chooseLogin === "employee" && (
          <div className="text-center animate-in fade-in duration-500 group">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Government employee workspace and tools</p>
            <a href={import.meta.env.VITE_EMPLOYEE_URL} className={buttonLinkClasses}>
              <span className="flex items-center gap-2">
                Employee Portal 
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;