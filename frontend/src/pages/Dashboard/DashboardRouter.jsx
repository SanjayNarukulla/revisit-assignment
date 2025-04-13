// src/pages/Dashboard/DashboardRouter.jsx
import { Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

function DashboardRouter() {
  const role = localStorage.getItem("role");

  if (!role) return <Navigate to="/" />; // Not logged in

  if (role === "admin") return <AdminDashboard />;
  if (role === "user") return <UserDashboard />;

  return <div>Invalid role</div>;
}

export default DashboardRouter;
