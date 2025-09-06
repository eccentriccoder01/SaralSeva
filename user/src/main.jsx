import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
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
          <App />
        </SchemeProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
