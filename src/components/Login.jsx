import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  // ✅ Client-side validation function
  const validateForm = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ valid if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return; // ❌ stop if validation fails

    setLoading(true);
    try {
      await login(formData);
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err.response?.data?.non_field_errors?.[0] || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back 👋</h2>
          <p className="mt-2 text-gray-500 text-sm">
            Sign in to continue to <span className="font-semibold">ERP System</span>
          </p>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {/* Server Error */}
          {serverError && (
            <div className="bg-red-50 border border-red-400 text-red-600 px-4 py-2 rounded-lg text-sm">
              {serverError}
            </div>
          )}

          {/* Email */}
          <div className="relative">
            <IoMail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              className={`w-full pl-10 pr-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
              placeholder="Email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <RiLockPasswordFill className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              className={`w-full pl-10 pr-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-2 px-4 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Extra Links */}
          <div className="flex items-center justify-between text-sm">
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
            <Link to="/register" className="text-blue-600 hover:underline">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
