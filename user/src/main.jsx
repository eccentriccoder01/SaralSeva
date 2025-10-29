import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ import BrowserRouter
import App from "./App.jsx";
import "./index.css";
import { SchemeProvider } from "./components/context/SchemaContext.jsx";
import { UserProvider } from "./components/context/UserContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
