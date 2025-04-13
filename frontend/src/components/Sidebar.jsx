// Sidebar.jsx
import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaUsers,
  FaChartLine,
  FaTags,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItem = (icon, label, active = false) => (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors whitespace-nowrap ${
        active ? "bg-blue-700 text-white" : "hover:bg-blue-800 text-gray-200"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden bg-blue-900 text-white p-4 flex items-center justify-between">
        <div className="text-xl font-bold tracking-wide">fastcart</div>
        <button onClick={toggleSidebar}>
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Sidebar overlay on mobile, static on desktop */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden`}
        onClick={toggleSidebar}
      />

      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out
        fixed md:static top-0 left-0 h-screen w-64 bg-blue-900 text-white flex flex-col z-50`}
      >
        <div className="p-6 text-2xl font-bold border-b border-blue-800 tracking-wide">
          fastcart
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Main</p>
          {navItem(<FaTachometerAlt />, "Dashboard")}
          {navItem(<FaBoxOpen />, "Orders")}

          <p className="text-xs text-gray-400 uppercase mt-4 tracking-wide">
            Products
          </p>
          {navItem(<FaTags />, "Categories", true)}
          {navItem(<FaUsers />, "Customers")}
          {navItem(<FaChartLine />, "Reports")}
          {navItem(<FaTags />, "Coupons")}

          <p className="text-xs text-gray-400 uppercase mt-4 tracking-wide">
            Other Info
          </p>
          {navItem(<FaBoxOpen />, "Knowledge Base")}
          {navItem(<FaBoxOpen />, "Product Updates")}

          <p className="text-xs text-gray-400 uppercase mt-4 tracking-wide">
            Settings
          </p>
          {navItem(<FaCog />, "Personal Settings")}
          {navItem(<FaCog />, "Global Settings")}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
