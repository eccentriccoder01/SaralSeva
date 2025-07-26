import React, { useContext, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { EmployeeContext } from "./context/EmployeeContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginEmployee, error, isAuthenticated } = useContext(EmployeeContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginEmployee(email, password);
    if(success) {
      toast.success("Login successful!");
    }
  };
  
  const inputClasses = "w-full p-3 border border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none";

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-orange-50/30" style={{backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Toaster position="top-center" richColors />
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-orange-900 jost">Employee Portal Login</h1>
          <p className="text-gray-600 mt-2">Access your dashboard to continue your work.</p>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="font-medium text-gray-700">Email Address</label>
            <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} className={`mt-1 ${inputClasses}`} required />
          </div>
          <div>
            <label className="font-medium text-gray-700">Password</label>
            <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} className={`mt-1 ${inputClasses}`} required />
          </div>
          <p className="text-sm text-right text-orange-700 hover:underline">
            <Link to="#">Forgot Password?</Link>
          </p>

          {error && <p className="text-center text-red-600 font-medium">{error}</p>}
          
          <Button className="w-full text-lg py-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-px transition-all" type="submit">
            Log In
          </Button>

          <p className="text-sm text-center text-gray-600">
            Need an account?{' '}
            <Link to='/register' className="font-semibold text-orange-700 hover:underline">Register Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;