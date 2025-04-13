// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import DashboardRouter from "./pages/Dashboard/DashboardRouter"; // ✅ Import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/*" element={<DashboardRouter />} />{" "}
        {/* ✅ Always rendered */}
      </Routes>
    </Router>
  );
}

export default App;
