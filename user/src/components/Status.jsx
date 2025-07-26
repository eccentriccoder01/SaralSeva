import axios from "axios";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const Status = () => {
  const [checked, setChecked] = useState("scheme");
  const [inputValue, setInputValue] = useState("");
  const [resultScheme, setResultScheme] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResultScheme(null);
    try {
        const url = checked === 'scheme' 
            ? "http://localhost:5000/api/v1/user/scheme/checkSchemeStatus" 
            : "http://localhost:5000/api/v1/grievances/status"; // Assuming this is the grievance status endpoint
        
        const payload = checked === 'scheme'
            ? { registration_no: inputValue }
            : { grievance_registered_number: inputValue };

        const res = await axios.post(url, payload);
        
        if (checked === 'scheme') {
            setResultScheme(res.data.schemeApplied);
        } else {
            // Assuming grievance response has a similar structure
            setResultScheme(res.data.grievance);
        }

    } catch (err) {
        setError(err.response?.data?.message || `Could not find the ${checked}.`);
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-[80vh] py-12 px-4 bg-orange-50/30">
      <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-2xl">
        <div className="text-center">
            <h1 className="text-4xl font-extrabold text-orange-900 jost">Check Application Status</h1>
            <p className="mt-2 text-lg text-gray-600">
                Enter your registration number below to track the progress of your application.
            </p>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex bg-gray-200 rounded-lg p-1 my-8">
            <button onClick={() => { setChecked("scheme"); setResultScheme(null); setError(''); }} className={`flex-1 p-2 rounded-md font-semibold transition-colors ${checked === 'scheme' ? 'bg-orange-600 text-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}>Scheme Status</button>
            <button onClick={() => { setChecked("grievance"); setResultScheme(null); setError(''); }} className={`flex-1 p-2 rounded-md font-semibold transition-colors ${checked === 'grievance' ? 'bg-orange-600 text-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}>Grievance Status</button>
        </div>
        
        <form className="flex flex-col sm:flex-row items-stretch gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            className="flex-grow p-3 text-lg border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-amber-500"
            placeholder={`Enter ${checked === 'scheme' ? 'Scheme' : 'Grievance'} Number`}
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
          <Button
            className="p-3 text-lg font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg shadow-md hover:shadow-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Checking...' : 'Check Status'}
          </Button>
        </form>

        {/* Results Display */}
        <div className="mt-8 min-h-[100px]">
            {error && <p className="p-4 text-center text-red-700 bg-red-100 rounded-lg">{error}</p>}
            {resultScheme && (
                 <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                    <h3 className="text-xl font-bold text-blue-900">Application Status</h3>
                    <p className="mt-2 text-gray-700">
                        Initial Status: <span className="font-semibold capitalize">{resultScheme.initial_status || resultScheme.status}</span>
                    </p>
                    {resultScheme.final_status && (
                        <p className="mt-1 text-gray-700">
                            Final Status: <span className="font-semibold capitalize">{resultScheme.final_status}</span>
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