import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { EmployeeProvider } from "./components/context/EmployeeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EmployeeProvider>
      <App />
    </EmployeeProvider>
  </StrictMode>
);
