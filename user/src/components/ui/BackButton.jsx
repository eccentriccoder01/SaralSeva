// src/components/BackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ defaultPath = "/dashboard" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1); // Go back if possible
    } else {
      navigate(defaultPath); // fallback
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 px-3 py-1 text-white bg-orange-500 hover:bg-amber-400 rounded-md transition-all duration-300"
    >
      <FaArrowLeft className="w-5 h-5" />
      Back
    </button>
  );
};

export default BackButton;
