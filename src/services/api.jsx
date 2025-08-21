import axios from 'axios';

const API_BASE_URL = 'http://16.171.134.197/api';


class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
              refresh: refreshToken,
            });

            const { access } = response.data;
            localStorage.setItem('access_token', access);

            return this.api(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Authentication
  async login(credentials) {
    const response = await this.api.post('/auth/login/', credentials);
    return response.data;
  }

  async register(userData) {
    const response = await this.api.post('/auth/register/', userData);
    return response.data;
  }

  async logout(refreshToken) {
    const response = await this.api.post('/auth/logout/', {
      refresh: refreshToken,
    });
    return response.data;
  }

  // Users
  async getUsers() {
    const response = await this.api.get('/auth/users/');
    return response.data;
  }

  async createUser(userData) {
    const response = await this.api.post('/auth/users/', userData);
    return response.data;
  }

  async updateUserPartially(userId, userData) {
    const response = await this.api.patch(`/auth/users/${userId}/`, userData);
    return response.data;
  }

  async updateUser(userId, userData) {
    const response = await this.api.put(`/auth/users/${userId}/`, userData);
    return response.data;
  }

  async deleteUser(userId) {
    const response = await this.api.delete(`/auth/users/${userId}/`);
    return response.data;
  }

  async getProfile() {
    const response = await this.api.get('/auth/profile/');
    return response.data;
  }

  async updateProfile(profileData) {
    const response = await this.api.put('/auth/profile/', profileData);
    return response.data;
  }
}

export default new ApiService();