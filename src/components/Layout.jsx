import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  FaRegUser,
  FaArrowAltCircleRight,
  FaHome,
  FaBars,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getNavItems = () => {
    const items = [
      { name: "Dashboard", href: "/dashboard", icon: FaHome },
      { name: "Profile", href: "/profile", icon: FaRegUser },
    ];

    if (user?.role === "admin" || user?.role === "manager") {
      items.push({ name: "Users", href: "/users", icon: FaUsers });
    }

    return items;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <h1 className="text-xl font-bold text-indigo-600">ERP System</h1>
        </div>
        <nav className="flex-1 mt-6">
          {getNavItems().map((item, idx) => (
            <Link
              key={idx}
              to={item.href}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex md:hidden"
        >
          <div className="w-64 bg-white shadow-lg flex flex-col">
            <div className="flex items-center justify-between h-16 px-4 border-b">
              <h1 className="text-xl font-bold text-indigo-600">ERP System</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 mt-6">
              {getNavItems().map((item, idx) => (
                <Link
                  key={idx}
                  to={item.href}
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        </motion.aside>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Top Navbar */}
        <nav className="flex items-center justify-between bg-white h-16 px-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              className="md:hidden text-gray-600 hover:text-gray-900"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars className="h-6 w-6" />
            </button>
            <h2 className="hidden md:block text-lg font-semibold text-gray-800">
              Welcome, {user?.first_name}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden sm:block text-sm text-gray-600">
              {user?.first_name} {user?.last_name} ({user?.role})
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200"
            >
              <FaArrowAltCircleRight className="h-5 w-5 mr-1" />
              Logout
            </button>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
