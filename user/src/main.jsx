import React from "react";
import ReactDOM from "react-dom/client";  
import { HelmetProvider } from "react-helmet-async";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ import BrowserRouter
import App from "./App.jsx";
import "./index.css";
import { SchemeProvider } from "./components/context/SchemaContext.jsx";
import { UserProvider } from "./components/context/UserContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './i18n/config.js'; // ✅ Import i18next configuration
import "./src/i18n.js"; // ✅ Import i18next configuration

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserProvider>
        <SchemeProvider>
          <HelmetProvider>
            <BrowserRouter> {/* ✅ Wrap App here */}
              <App />
            </BrowserRouter>
          </HelmetProvider>
        </SchemeProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
