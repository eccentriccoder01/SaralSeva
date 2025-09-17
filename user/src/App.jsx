import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import ScrollToTop from "./components/ScrollToTop";
import ScrollToBottom from "./components/ScrollToBottom";
import Chatbot from "./components/chatbot/Chatbot";

import Topbar from "./components/Topbar";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/pages/Footer";

import Home from "./components/pages/home/Home";
import Login from "./components/pages/login-register/Login";
import UserLogin from "./components/pages/login-register/UserLogin";
import CompleteGoogleRegistration from "./components/pages/login-register/CompleteGoogleRegistration";
import Register from "./components/pages/login-register/Register";
import VerifyOtp from "./components/pages/login-register/VerifyOtp";

import About from "./components/pages/About";
import SchemeEligibilty from "./components/pages/scheme/SchemeEligibilty";
import Scheme from "./components/pages/scheme/Scheme";
import SchemeDetails from "./components/pages/scheme/SchemeDetails";
import SchemeAppliedForm from "./components/pages/scheme/SchemeAppliedForm";
import SchemeAppliedConfirmationPage from "./components/pages/scheme/SchemeAppliedConfirmationPage";

import Grievances from "./components/Grievances";
import GrievancesRegistrationForm from "./components/GrievancesRegistrationForm";
import GrievanceConfirmation from "./components/GrievanceConfirmation";
import GrievancesApplied from "./components/GrievancesApplied";
import SchemeApplied from "./components/SchemeApplied";
import Status from "./components/Status";
import Dashboard from "./components/Dashboard";

import Profile from "./components/pages/Profile";
import EditProfile from "./components/pages/EditProfile";

import Contact from "./components/Contact";
import Faq from "./components/Faq";
import PrivacyPolicy from "./components/PrivacyPolicy";
import LinkingPolicy from "./components/LinkingPolicy";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Show Chatbot on all pages except login/register/userlogin
  const showChatbot = !["/login", "/register", "/userlogin"].includes(location.pathname);

  return (
    <>
      <Topbar />
      <Header />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/userlogin" element={isAuthenticated ? <Home /> : <UserLogin isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/auth/complete-registration" element={<CompleteGoogleRegistration setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={isAuthenticated ? <Home /> : <Register />} />
        <Route path="/auth/verify-otp" element={isAuthenticated ? <Home /> : <VerifyOtp isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />

        <Route path="/about" element={<About />} />
        <Route path="/scheme_eligibity" element={<SchemeEligibilty />} />
        <Route path="/schemes" element={<Scheme />} />
        <Route path="/scheme/:id" element={<SchemeDetails />} />
        <Route path="/apply" element={isAuthenticated ? <SchemeAppliedForm /> : <UserLogin />} />
        <Route path="/scheme_applied_success" element={isAuthenticated ? <SchemeAppliedConfirmationPage /> : <Login />} />
        <Route path="/schemeApplied" element={isAuthenticated ? <SchemeApplied /> : <Login />} />

        <Route path="/grievances" element={<Grievances />} />
        <Route path="/grievances/grievances_registration_form" element={<GrievancesRegistrationForm isAuthenticated={isAuthenticated} />} />
        <Route path="/grievances_success" element={isAuthenticated ? <GrievanceConfirmation /> : <Login />} />
        <Route path="/grievancesApplied" element={isAuthenticated ? <GrievancesApplied /> : <Login />} />

        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login />} />
        <Route path="/profile/edit" element={isAuthenticated ? <EditProfile /> : <Login />} />

        <Route path="/status" element={<Status />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/linkingpolicy" element={<LinkingPolicy />} />
      </Routes>

      <Footer />
      <ScrollToTop />
      <ScrollToBottom />
      {showChatbot && <Chatbot />}
    </>
  );
}

export default App;
