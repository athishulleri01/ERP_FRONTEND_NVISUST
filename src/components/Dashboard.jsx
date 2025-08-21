import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import { FaUsers, FaUser  } from "react-icons/fa";
import { Building2 } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      if (user?.role === 'admin' || user?.role === 'manager') {
        const users = await apiService.getUsers();
        setStats({
          totalUsers: users.length,
          activeUsers: users.filter(u => u.is_active).length
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleSpecificContent = () => {
    switch (user?.role) {
      case 'admin':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <FaUsers className="h-8 w-8" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.totalUsers}
                  </p>
                  <p className="text-gray-600">Total Users</p>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <FaUser className="h-8 w-8" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.activeUsers}
                  </p>
                  <p className="text-gray-600">Active Users</p>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <Building2  className="h-8 w-8" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">Admin</p>
                  <p className="text-gray-600">Your Role</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'manager':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <FaUser className="h-8 w-8" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.totalUsers}
                  </p>
                  <p className="text-gray-600">Employees</p>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                  <Building2 className="h-8 w-8" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">Manager</p>
                  <p className="text-gray-600">Your Role</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="card">
            <div className="text-center">
              <FaUser className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Employee Dashboard
              </h3>
              <p className="text-gray-600">
                Welcome to your employee dashboard. You can view and update your profile information.
              </p>
            </div>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {user?.first_name}!
        </h1>
        <p className="text-gray-600">
          You are logged in as {user?.role}
        </p>
      </div>

      {getRoleSpecificContent()}

      <div className="mt-8 card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="space-y-2">
          {user?.role === 'admin' && (
            <a
              href="/users"
              className="block p-3 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100"
            >
              Manage Users
            </a>
          )}
          {user?.role === 'manager' && (
            <a
              href="/users"
              className="block p-3 bg-green-50 text-green-700 rounded-md hover:bg-green-100"
            >
              View Employees
            </a>
          )}
          <a
            href="/profile"
            className="block p-3 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100"
          >
            Update Profile
          </a>
        </div>
      </div>
    </div>
  );
};


export default Dashboard;