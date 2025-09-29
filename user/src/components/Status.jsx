import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "react-tooltip";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";

// Tooltip style
const tooltipStyle = {
  backgroundColor: "#FF9933",
  color: "#1F2937",
  padding: "8px 12px",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: 500,
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  maxWidth: "220px",
  whiteSpace: "pre-line",
  zIndex: 9999,
};

const Status = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState("scheme");
  const [inputValue, setInputValue] = useState("");
  const [resultScheme, setResultScheme] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);

  // Persist theme
  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [isLightMode]);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setIsLightMode(false);
    else setIsLightMode(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResultScheme(null);
    try {
      const url =
        checked === "scheme"
          ? `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/scheme/checkSchemeStatus`
          : `${import.meta.env.VITE_API_BASE_URL}/api/v1/grievances/status`;

      const payload =
        checked === "scheme"
          ? { registration_no: inputValue }
          : { grievance_registered_number: inputValue };

      const res = await axios.post(url, payload);

      if (checked === "scheme") setResultScheme(res.data.schemeApplied);
      else setResultScheme(res.data.grievance);
    } catch (err) {
      setError(err.response?.data?.message || `Could not find the ${checked}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] py-12 px-4 bg-orange-50/30 dark:bg-gray-900/30 transition-colors duration-500">
      <div className="relative w-full max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transition-colors duration-500">
        
{/* Go Back Arrow - aligned with heading */}
<FaArrowLeft
  className="absolute left-4 top-10 text-orange-500 hover:text-amber-400 cursor-pointer text-2xl"
  onClick={() => navigate(-1)}
  title="Go Back"
/>



        {/* Centered Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-orange-900 dark:text-orange-400 jost">
            Check Application Status
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Enter your registration number below to track the progress of your application.
          </p>
        </div>

        {/* Scheme / Grievance toggle with tooltips */}
        <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1 my-8 transition-colors duration-500">
          <button
            onClick={() => {
              setChecked("scheme");
              setResultScheme(null);
              setError("");
            }}
            className={`flex-1 p-2 rounded-md font-semibold transition-colors ${
              checked === "scheme"
                ? "bg-orange-600 text-white shadow"
                : "text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            data-tooltip-id="schemeTip"
            data-tooltip-content="Check the status of your scheme application"
          >
            Scheme Status
          </button>
          <button
            onClick={() => {
              setChecked("grievance");
              setResultScheme(null);
              setError("");
            }}
            className={`flex-1 p-2 rounded-md font-semibold transition-colors ${
              checked === "grievance"
                ? "bg-orange-600 text-white shadow"
                : "text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            data-tooltip-id="grievanceTip"
            data-tooltip-content="Check the status of your grievance"
          >
            Grievance Status
          </button>
          <Tooltip id="schemeTip" style={tooltipStyle} />
          <Tooltip id="grievanceTip" style={tooltipStyle} />
        </div>

        {/* Input with tooltip */}
        <form className="flex flex-col sm:flex-row items-stretch gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            className="flex-grow p-3 text-lg border border-gray-300 dark:border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-gray-200 transition-colors duration-500"
            placeholder={`Enter ${checked === "scheme" ? "Scheme" : "Grievance"} Number`}
            onChange={(e) => setInputValue(e.target.value)}
            required
            data-tooltip-id="inputTip"
            data-tooltip-content={`Enter your ${checked} registration number exactly as provided.`}
          />
          <Tooltip id="inputTip" style={tooltipStyle} />

          <Button
            className="p-3 text-lg font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg shadow-md hover:shadow-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? "Checking..." : "Check Status"}
          </Button>
        </form>

        <div className="mt-8 min-h-[100px]">
          {error && (
            <p
              className="p-4 text-center text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 rounded-lg transition-colors duration-500"
              data-tooltip-id="errorTip"
              data-tooltip-content={error}
            >
              {error}
            </p>
          )}
          <Tooltip id="errorTip" style={tooltipStyle} />

          {resultScheme && (
            <div
              className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 rounded-r-lg transition-colors duration-500"
              data-tooltip-id="resultTip"
              data-tooltip-content={`Initial Status: ${resultScheme.initial_status || resultScheme.status}${
                resultScheme.final_status ? `\nFinal Status: ${resultScheme.final_status}` : ""
              }`}
            >
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300">
                Application Status
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-200">
                Initial Status:{" "}
                <span className="font-semibold capitalize">
                  {resultScheme.initial_status || resultScheme.status}
                </span>
              </p>
              {resultScheme.final_status && (
                <p className="mt-1 text-gray-700 dark:text-gray-200">
                  Final Status:{" "}
                  <span className="font-semibold capitalize">{resultScheme.final_status}</span>
                </p>
              )}
              <Tooltip id="resultTip" style={tooltipStyle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Status;
