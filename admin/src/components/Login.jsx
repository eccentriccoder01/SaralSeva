import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import banner from '../assets/ChatbotBg.jpg';
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "./context/adminContext";
import { Toaster, toast } from "sonner";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login, error, isAuthenticated } = useContext(AdminContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(formData);
    if(success) {
      toast.success("Login successful!");
    }
  };
  
  const inputClasses = "w-full p-3 bg-white/80 border border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none";

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4" style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover' }}>
      <Toaster position="top-center" richColors />
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative w-full max-w-md p-10 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border-t-8 border-amber-500">
        <form className="flex flex-col items-center justify-center gap-4" onSubmit={handleLogin}>
          <h1 className="text-3xl font-bold text-center text-orange-900 jost">Admin Portal Login</h1>
          <input
            type="email"
            placeholder="Enter your Email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            className={inputClasses}
            required
          />
          <input
            type="password"
            placeholder="Enter your Password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            className={inputClasses}
            required
          />
          <p className="w-full text-sm text-right text-orange-700 hover:underline">
            <Link to="#">Forgot Password?</Link>
          </p>
          {error && <p className="text-center text-red-600 font-medium">{error}</p>}
          <Button className="w-full mt-4 text-xl py-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg shadow-lg hover:shadow-xl" type="submit">
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;