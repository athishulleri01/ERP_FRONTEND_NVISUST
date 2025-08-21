import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import UserModal from './UserModal';
import Login from './Login';
import Register from './Register';
import Layout from './Layout';
import Dashboard from './Dashboard';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon 
} from '@heroicons/react/outline';

const UserList = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await apiService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setModalMode('create');
    setModalOpen(true);
  };

  const handleEditUser = (userData) => {
    setSelectedUser(userData);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleViewUser = (userData) => {
    setSelectedUser(userData);
    setModalMode('view');
    setModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await apiService.deleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
      } catch (error) {
        alert('Error deleting user');
      }
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleUserSaved = () => {
    fetchUsers();
    handleModalClose();
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          {user?.role === 'admin' ? 'User Management' : 'Employee List'}
        </h1>
        {user?.role === 'admin' && (
          <button
            onClick={handleCreateUser}
            className="btn-primary flex items-center px-3 py-2 text-sm sm:text-base"
          >
            <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Add User
          </button>
        )}
      </div>

      {/* Table for desktop */}
      <div className="hidden sm:block card">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Department</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userData) => (
                <tr key={userData.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{userData.first_name} {userData.last_name}</td>
                  <td className="py-3 px-4">{userData.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      userData.role === 'admin' ? 'bg-red-100 text-red-800' :
                      userData.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {userData.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">{userData.department || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      userData.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {userData.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button onClick={() => handleViewUser(userData)} className="text-gray-600 hover:text-gray-800" title="View">
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      {user?.role === 'admin' && (
                        <>
                          <button onClick={() => handleEditUser(userData)} className="text-blue-600 hover:text-blue-800" title="Edit">
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button onClick={() => handleDeleteUser(userData.id)} className="text-red-600 hover:text-red-800" title="Delete">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile view as cards */}
      <div className="sm:hidden space-y-4">
        {users.map((userData) => (
          <div key={userData.id} className="p-4 border rounded-lg shadow-sm bg-white">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">{userData.first_name} {userData.last_name}</h2>
              <div className="flex space-x-2">
                <button onClick={() => handleViewUser(userData)} className="text-gray-600 hover:text-gray-800" title="View">
                  <EyeIcon className="h-5 w-5" />
                </button>
                {user?.role === 'admin' && (
                  <>
                    <button onClick={() => handleEditUser(userData)} className="text-blue-600 hover:text-blue-800" title="Edit">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDeleteUser(userData.id)} className="text-red-600 hover:text-red-800" title="Delete">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600">{userData.email}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                userData.role === 'admin' ? 'bg-red-100 text-red-800' :
                userData.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>{userData.role}</span>
              <span className="text-xs text-gray-500">{userData.department || 'N/A'}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                userData.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {userData.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <UserModal
          user={selectedUser}
          mode={modalMode}
          onClose={handleModalClose}
          onSave={handleUserSaved}
        />
      )}
    </div>
  );
};

export { Login, Register, Layout, Dashboard, UserList };
