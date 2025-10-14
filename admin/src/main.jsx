import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AdminProvider } from "./components/context/adminContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
    <AdminProvider>
      <App />
    </AdminProvider>
    </HelmetProvider>
  </StrictMode>
);
