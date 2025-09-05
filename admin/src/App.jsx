import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import AddScheme from "./components/AddScheme";

// ✅ Import ScrollToBottom
import ScrollToBottom from "./components/ScrollToBottom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="add-scheme" element={<AddScheme />} />
        </Route>
      </Routes>

      {/* ✅ Always render scroll button */}
      <ScrollToBottom />
    </BrowserRouter>
  );
}

export default App;
