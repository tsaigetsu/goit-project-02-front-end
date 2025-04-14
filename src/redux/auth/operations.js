import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, clearToken, setToken } from '../../api.js';
import toast from 'react-hot-toast';

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/register', credentials);

      setToken(data.accessToken);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/login', credentials);

      // localStorage.setItem('token', data.data.accessToken);
      setToken(data.data.accessToken);
      const token = data.data.accessToken;
      const response = await api.get('/user/profile');
      const userData = response.data.data;

      return { token, userData }; //верно!!!
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const currentUserThunk = createAsyncThunk(
  'currentUser',
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.token;

    if (!savedToken) {
      return thunkAPI.rejectWithValue('No token found');
    }

    try {
      setToken(savedToken);
      const response = await api.get('/user/profile');
      return response.data.data;
    } catch (error) {
      clearToken();
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const refresh = createAsyncThunk(
//   'refresh/user',
//   async (_, thunkAPI) => {
//     const reduxState = thunkAPI.getState();
//     setToken(reduxState.auth.token);

//     const response = await axios.get('/auth/refresh');
//     return response.data;
//   },
//   {
//     condition(_, thunkAPI) {
//       const reduxState = thunkAPI.getState();

//       return reduxState.auth.token !== null;
//     },
//   }
// );

export const logoutThunk = createAsyncThunk('logout', async (_, thunkAPI) => {
  try {
    clearToken();
    localStorage.removeItem('token');

    await api.post('auth/logout');
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUserAvatar = createAsyncThunk(
  'user/updateUserAvatar',
  async (formData, thunkAPI) => {
    try {
      const response = await api.patch(`/user/profile`, formData);

      return response.data.data;
    } catch (error) {
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

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
