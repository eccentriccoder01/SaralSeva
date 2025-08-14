 import { BrowserRouter, Route, Routes } from 'react-router-dom';
 import ScrollToTop from './components/ScrollToTop';

import './App.css'


import Navbar from './components/Navbar';
import Home from './components/pages/home/Home';
import Header from './components/Header';
import Topbar from './components/Topbar';
import Login from './components/pages/login-register/Login';
import UserLogin from './components/pages/login-register/UserLogin';
import Register from './components/pages/login-register/Register';
import About from './components/pages/About';
import SchemeEligibilty from './components/pages/scheme/SchemeEligibilty';
import Scheme from './components/pages/scheme/Scheme';
import Footer from './components/pages/Footer';
import SchemeDetails from './components/pages/scheme/SchemeDetails';
import Grievances from './components/Grievances';
import GrievancesRegistrationForm from './components/GrievancesRegistrationForm';
import VerifyOtp from './components/pages/login-register/VerifyOtp';
import { useEffect, useState } from 'react';
import SchemeAppliedForm from './components/pages/scheme/SchemeAppliedForm';
import SchemeAppliedConfirmationPage from './components/pages/scheme/SchemeAppliedConfirmationPage';
import GrievanceConfirmation from './components/GrievanceConfirmation';
import Profile from './components/pages/Profile';
import SchemeApplied from './components/SchemeApplied';
import GrievancesApplied from './components/GrievancesApplied';
import Status from './components/Status';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const 
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);
  return (
    <BrowserRouter>
    <Topbar/>
    <Header/>
    <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={isAuthenticated ? <Home/> : <Login/>}/>
      <Route path='/userlogin' element={isAuthenticated ? <Home/> : <UserLogin isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
      <Route path='/register' element={isAuthenticated ? <Home/> : <Register/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/scheme_eligibity' element={<SchemeEligibilty/>}/>
      <Route path='/schemes' element={<Scheme/>}/>
      <Route path='/scheme/:id' element={<SchemeDetails/>}/>
      <Route path='/grievances' element={<Grievances/>}/>
      <Route path='/grievances/grievances_registration_form' element={<GrievancesRegistrationForm isAuthenticated={isAuthenticated} />}/>
      <Route path='/auth/verify-otp' element={isAuthenticated ? <Home/>:<VerifyOtp isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
      <Route path='/apply' element={isAuthenticated ? <SchemeAppliedForm/> : <UserLogin/>}/>
      <Route path='/scheme_applied_success' element={isAuthenticated ?  <SchemeAppliedConfirmationPage/>: <Login/>}/>
      <Route path='/grievances_success' element={isAuthenticated ?  <GrievanceConfirmation/>: <Login/>}/>
      <Route path='/profile' element={isAuthenticated ?  <Profile/>: <Login/>}/>     
      <Route path='/schemeApplied' element={isAuthenticated ?  <SchemeApplied/>: <Login/>}/>     
      <Route path='/grievancesApplied' element={isAuthenticated ?  <GrievancesApplied/>: <Login/>}/>   
      <Route path='/status' element={<Status/>}/>  
      <Route path='/dashboard' element={<Dashboard/>}/>  
      <Route path='/contact' element={<Contact/>}/>  
    </Routes>
    <Footer/>
    <ScrollToTop />
    </BrowserRouter>
  )
}

export default App
