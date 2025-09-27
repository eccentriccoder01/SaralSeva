import React, { useState } from "react";
import user from "./../../../assets/user.svg";
import admin from "./../../../assets/admin.svg";
import employee from "./../../../assets/employee.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  const [chooseLogin, setChooseLogin] = useState("");

  const cardBaseClasses =
    "relative w-52 h-52 flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-500 bg-white hover:scale-105 hover:shadow-2xl";
  const cardSelectedClasses =
    "scale-105 border-4 border-amber-500 shadow-2xl ring-4 ring-amber-300/40";
  const imageBaseClasses =
    "w-24 h-24 transition-all duration-300 drop-shadow-md";
  const imageSelectedClasses = "grayscale-0";
  const imageUnselectedClasses =
    "grayscale opacity-60 hover:opacity-90";
  const buttonLinkClasses =
    "inline-block px-10 mt-3 text-lg font-semibold text-center uppercase bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl shadow-md hover:shadow-2xl hover:from-orange-700 hover:to-amber-700 transform hover:-translate-y-1 transition-all py-3 tracking-wide";

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      {/* Heading */}
      <div className="text-center animate-in fade-in zoom-in duration-700">
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-900 jost drop-shadow-sm">
          Choose Your Login Type
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-lg mx-auto">
          Please select the type of account you wish to access.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap items-center justify-center gap-12 mt-14">
        <div
          className={`${cardBaseClasses} ${
            chooseLogin === "user" ? cardSelectedClasses : ""
          }`}
          onClick={() => setChooseLogin("user")}
        >
          <img
            src={user}
            alt="User Login"
            className={`${imageBaseClasses} ${
              chooseLogin === "user"
                ? imageSelectedClasses
                : imageUnselectedClasses
            }`}
          />
          <h2
            className={`mt-3 text-xl font-bold tracking-wide ${
              chooseLogin === "user"
                ? "text-orange-800"
                : "text-gray-700"
            }`}
          >
            User
          </h2>
        </div>

        <div
          className={`${cardBaseClasses} ${
            chooseLogin === "admin" ? cardSelectedClasses : ""
          }`}
          onClick={() => setChooseLogin("admin")}
        >
          <img
            src={admin}
            alt="Admin Login"
            className={`${imageBaseClasses} ${
              chooseLogin === "admin"
                ? imageSelectedClasses
                : imageUnselectedClasses
            }`}
          />
          <h2
            className={`mt-3 text-xl font-bold tracking-wide ${
              chooseLogin === "admin"
                ? "text-orange-800"
                : "text-gray-700"
            }`}
          >
            Admin
          </h2>
        </div>

        <div
          className={`${cardBaseClasses} ${
            chooseLogin === "employee" ? cardSelectedClasses : ""
          }`}
          onClick={() => setChooseLogin("employee")}
        >
          <img
            src={employee}
            alt="Employee Login"
            className={`${imageBaseClasses} w-28 h-28 ${
              chooseLogin === "employee"
                ? imageSelectedClasses
                : imageUnselectedClasses
            }`}
          />
          <h2
            className={`mt-3 text-xl font-bold tracking-wide ${
              chooseLogin === "employee"
                ? "text-orange-800"
                : "text-gray-700"
            }`}
          >
            Employee
          </h2>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-10 h-28 flex flex-col items-center justify-center">
        {chooseLogin === "user" && (
          <Link
            to="/userlogin"
            className="text-center animate-in slide-in-from-bottom-2 duration-500"
          >
            <p className="text-gray-500">Only for Registered Users</p>
            <Button className="px-10 mt-3 text-lg font-semibold uppercase bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl shadow-md hover:shadow-2xl hover:from-orange-700 hover:to-amber-700 transform hover:-translate-y-1 transition-all tracking-wide">
              User Login
            </Button>
          </Link>
        )}

        {chooseLogin === "admin" && (
          <div className="text-center animate-in slide-in-from-bottom-2 duration-500">
            <p className="text-gray-500">Only for Administrative Staff</p>
            <a href={import.meta.env.VITE_ADMIN_URL} className={buttonLinkClasses}>
              Admin Login
            </a>
          </div>
        )}

        {chooseLogin === "employee" && (
          <div className="text-center animate-in slide-in-from-bottom-2 duration-500">
            <p className="text-gray-500">Only for Employed Personnel</p>
            <a
              href={import.meta.env.VITE_EMPLOYEE_URL}
              className={buttonLinkClasses}
            >
              Employee Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
