import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Status = () => {
  const [checked, setChecked] = useState("scheme");
  const [inputValue, setInputValue] = useState("");
  const [resultScheme, setResultScheme] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true); // Initial state set to true for light mode

  // This useEffect handles setting the theme
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

  // This useEffect loads the saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsLightMode(false); // Set to dark mode if saved theme is 'dark'
    } else {
      setIsLightMode(true); // Default to light mode or if saved theme is 'light'
    }
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

      if (checked === "scheme") {
        setResultScheme(res.data.schemeApplied);
      } else {
        setResultScheme(res.data.grievance);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || `Could not find the ${checked}.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] py-12 px-4 bg-orange-50/30 dark:bg-gray-900/30 transition-colors duration-500">
      <div className="w-full max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transition-colors duration-500">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-orange-900 dark:text-orange-400 jost">
            Check Application Status
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Enter your registration number below to track the progress of your
            application.
          </p>
        </div>

        {/* Toggle theme button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {isLightMode ? "Dark Mode" : "Light Mode"}
          </button>
        </div>

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
          >
            Grievance Status
          </button>
        </div>

        <form
          className="flex flex-col sm:flex-row items-stretch gap-3"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="flex-grow p-3 text-lg border border-gray-300 dark:border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-gray-200 transition-colors duration-500"
            placeholder={`Enter ${
              checked === "scheme" ? "Scheme" : "Grievance"
            } Number`}
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
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
            <p className="p-4 text-center text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 rounded-lg transition-colors duration-500">
              {error}
            </p>
          )}
          {resultScheme && (
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 rounded-r-lg transition-colors duration-500">
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
                  <span className="font-semibold capitalize">
                    {resultScheme.final_status}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Status;
