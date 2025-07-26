import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import banner from '../assets/ChatbotBg.jpg';
import bg from '../assets/bg-1.7ef54ee8de41cb08.png';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AdminContext } from "./context/adminContext";
import { Toaster , toast } from "sonner";

const Login = () => {
  const [formData, setFormData] = useState({
      email:"",
      password:""
  })

  const navigate = useNavigate();
  // const handleLogin = async(e) =>{
  //   e.preventDefault();
  //   await axios.post("http://localhost:5000/api/v1/admin/loginAdmin",formData).then((res)=>{
  //     if(res.data.success){
  //       localStorage.setItem("token",res.data.token); 
  //       navigate("/")
  //     }
  //   })
  // }
  
  const {login , error, isAuthenticated} = useContext(AdminContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(formData)
    await login(formData);
    toast(
      <div className='w-full p-4 text-white bg-green-900 rounded-lg'>
        <h1 className="text-md">Login successfully</h1>
      </div>
    );
  }
  
  return (
   
      <div className="relative mt-40  shadow-lg w-[450px] mx-auto p-10 border-b-8 rounded border-b-green-900  "
      style={{backgroundImage:`url(${banner})`}}
      >
       <Toaster/>
          <form className="flex flex-col items-center justify-center gap-3 " onSubmit={handleLogin}
          >
            <h1 className="flex gap-3 text-3xl item-center"> Admin User Login</h1>
            <input
              type="type"
              placeholder="Enter your Email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              className="w-full p-3 py-1 mt-3 border border-gray-500 rounded-sm"
            />
            <input
              type="password"
              placeholder="Enter your Password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              className="w-full p-3 py-1 mt-3 border border-gray-500 rounded-sm"
            />
            <p className="w-full mt-2 text-sm text-right text-gray-500">
              Forgot Password ?
            </p>
            <p className="text-sm text-gray-500">
              Not registered ?
              <Link  to='/register'><span className="font-semibold text-md" >Register Now</span></Link>
            </p>
            <p className="text-center text-red-500">{error}</p>
            <Button className="w-full mt-5 text-xl bg-green-900 hover:bg-green-800" type="submit">
              Log in with Password
            </Button>
          </form>
      
      </div>
 
  );
};

export default Login;
