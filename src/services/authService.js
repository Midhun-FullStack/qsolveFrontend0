import api from '../config/api';

export const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/users/register', {
      username: userData.name,
      email: userData.email,
      password: userData.password,
      firstname: userData.name.split(' ')[0] || '',
      lastname: userData.name.split(' ').slice(1).join(' ') || '',
      role: 'student'
    });
    
    // Backend returns user data directly, no token on register
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/users/login', {
      email: credentials.email,
      password: credentials.password
    });
    
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response.data;
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.put('/users/change-password', passwordData);
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};