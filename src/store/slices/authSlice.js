import { createSlice } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const { setUser, setLoading, logout } = authSlice.actions;

// Thunks
export const initializeAuth = () => async (dispatch) => {
  dispatch(setLoading(true));
  if (authService.isAuthenticated()) {
    try {
      const userData = await authService.getProfile();
      dispatch(setUser(userData));
    } catch (error) {
      console.error('Failed to get user profile:', error);
      authService.logout();
      dispatch(setUser(null));
    }
  } else {
    dispatch(setUser(null));
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await authService.login(credentials);
    const userData = await authService.getProfile();
    dispatch(setUser(userData));
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Login failed'
    };
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    await authService.register(userData);
    const userProfile = await authService.getProfile();
    dispatch(setUser(userProfile));
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Registration failed'
    };
  }
};

export const logoutUser = () => (dispatch) => {
  authService.logout();
  dispatch(logout());
};

export default authSlice.reducer;
