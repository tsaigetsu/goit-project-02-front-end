import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, clearToken, setToken } from '../../api.js';
import toast from 'react-hot-toast';

export const logoutThunk = createAsyncThunk('logout', async (_, thunkAPI) => {
  try {
    clearToken();

    await api.post('auth/logout');
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/register', credentials);

      setToken(data.accessToken);
      toast.success('Welcome! You are successfully registered.', {
        duration: 3000,
        position: 'top-center',
        icon: '✔️',
      });
      console.log('data!!!!!!!', data);

      return data;
    } catch (error) {
      toast.error('This email is already registered', {
        duration: 3000,
        position: 'top-center',
        icon: '❌',
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/login', credentials);

      localStorage.setItem('token', data.data.accessToken);
      setToken(data.data.accessToken);
      const token = data.data.accessToken;
      const response = await api.get('/user/profile');
      const userData = response.data.data;

      toast.success('Welcome! You are logged in.', {
        duration: 3000,
        position: 'top-center',
        icon: '✔️',
      });

      return { token, userData }; //верно!!!
    } catch (error) {
      toast.error('Incorrect email or password', {
        duration: 3000,
        position: 'top-center',
        icon: '❌',
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const currentUserThunk = createAsyncThunk(
  'currentUser',
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.token;

    try {
      if (savedToken) {
        setToken(savedToken);
      }
      const response = await api.get('/user/profile');

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition(_, { getState }) {
      return Boolean(getState().auth.token);
    },
  }
);

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/user/profile');

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
  {
    condition(_, { getState }) {
      return !getState().auth.user._id;
    },
  }
);

export const updateUserAvatar = createAsyncThunk(
  'user/updateUserAvatar',
  async (formData, thunkAPI) => {
    try {
      const response = await api.patch(`/user/profile`, formData);

      toast.success('User updated successfully!', {
        duration: 3000,
        position: 'top-center',
        icon: '✔️',
      });
      return response.data.data;
    } catch (error) {
      toast.error('Failed to update user: ' + error.message, {
        duration: 3000,
        position: 'top-center',
        icon: '❌',
      });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateTheme = createAsyncThunk(
  'user/updateTheme',
  async (newTheme, thunkAPI) => {
    try {
      const response = await api.patch('/user/profile', { theme: newTheme });

      toast.success('Theme updated successfully!');
      return response.data.data;
    } catch (error) {
      toast.error('Error updating theme');
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const sendHelpCommentThunk = createAsyncThunk(
  'help/sendComment',
  async (data, thunkAPI) => {
    try {
      const response = await api.post('/help', data);

      toast.success("Email sent to tech support. We'll reply soon!", {
        duration: 3000,
        position: 'top-center',
        icon: '✔️',
      });

      return response.data;
    } catch (error) {
      console.error('Error sending help comment:', error.message);
      // toast.error("Error sending letter. Please, try again later.", {
      //   duration: 5000,
      //   position: "top-center",
      //   icon: "❌",
      // });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
