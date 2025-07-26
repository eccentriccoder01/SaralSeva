import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SchemeProvider } from "./components/context/SchemaContext.jsx";
import { UserProvider } from "./components/context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
      <UserProvider>
        <SchemeProvider>
          <App />
        </SchemeProvider>
      </UserProvider>
    </StrictMode>
  
);
