import React, { useState, useEffect } from 'react';
import { XIcon } from '@heroicons/react/outline';
import apiService from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const UserModal = ({ user, mode, onClose, onSave }) => {
  const { user: loggedInUser } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
    role: 'employee',
    phone: '',
    department: '',
    is_active: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && (mode === 'edit' || mode === 'view')) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        password: '',
        confirm_password: '',
        role: user.role || 'employee',
        phone: user.phone || '',
        department: user.department || '',
        is_active: user.is_active ?? true
      });
    }
  }, [user, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'view') return;

    setLoading(true);
    setError('');

    try {
      if (mode === 'create') {
        await apiService.createUser(formData);
      } else if (mode === 'edit') {
        const updateData = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          department: formData.department,
          is_active: formData.is_active,
        };

        //  allow role editing if logged in user is admin
        if (loggedInUser?.role === 'admin') {
          updateData.role = formData.role;
        }
        if (formData.avatar || formData.bio || formData.address || formData.date_of_birth) {
        updateData.profile = {
          avatar: formData.avatar || undefined,
          bio: formData.bio || undefined,
          address: formData.address || undefined,
          date_of_birth: formData.date_of_birth || undefined
        };
      }

        await apiService.updateUserPartially(user.id, updateData);
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.email?.[0] || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const isReadOnly = mode === 'view';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {mode === 'create' ? 'Add New User' : 
             mode === 'edit' ? 'Edit User' : 'User Details'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                required
                readOnly={isReadOnly}
                className={`form-input ${isReadOnly ? 'bg-gray-100' : ''}`}
                placeholder="First Name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />
              <input
                type="text"
                required
                readOnly={isReadOnly}
                className={`form-input ${isReadOnly ? 'bg-gray-100' : ''}`}
                placeholder="Last Name"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
            </div>

            {/* CREATE MODE */}
            {mode === 'create' && (
              <>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <input
                  type="email"
                  required
                  className="form-input"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <select
                  className="form-input"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </>
            )}

            {/* VIEW MODE */}
            {mode === 'view' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    readOnly
                    className="form-input bg-gray-100"
                    value={formData.email}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    readOnly
                    className="form-input bg-gray-100"
                    value={formData.role}
                  />
                </div>
              </>
            )}

            {/* EDIT MODE - role editable only for admins */}
            {mode === 'edit' && loggedInUser?.role === 'admin' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  className="form-input"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}

            <input
              type="tel"
              readOnly={isReadOnly}
              className={`form-input ${isReadOnly ? 'bg-gray-100' : ''}`}
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <input
              type="text"
              readOnly={isReadOnly}
              className={`form-input ${isReadOnly ? 'bg-gray-100' : ''}`}
              placeholder="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />

            {mode === 'create' && (
              <>
                <input
                  type="password"
                  required
                  className="form-input"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <input
                  type="password"
                  required
                  className="form-input"
                  placeholder="Confirm Password"
                  value={formData.confirm_password}
                  onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                />
              </>
            )}

            {mode === 'edit' && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                  Active User
                </label>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              {mode === 'view' ? 'Close' : 'Cancel'}
            </button>
            {!isReadOnly && (
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Saving...' : (mode === 'create' ? 'Create User' : 'Update User')}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
