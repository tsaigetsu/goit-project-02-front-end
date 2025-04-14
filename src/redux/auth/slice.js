import { createSlice } from '@reduxjs/toolkit';
import {
  currentUserThunk,
  logoutThunk,
  updateUserAvatar,
} from './operations.js';
import { clearToken as clearApiToken } from '../../api.js';
import { loginThunk, registerThunk } from './operations.js';

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logoutThunk.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(registerThunk.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(registerThunk.rejected, state => {
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })

      .addCase(loginThunk.pending, state => {
        state.isRefreshing = true;
        state.isLoggedIn = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.userData;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(loginThunk.rejected, state => {
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(currentUserThunk.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(currentUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(currentUserThunk.rejected, state => {
        state.token = null;
        state.user = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        clearApiToken();
        localStorage.removeItem('token');
        localStorage.removeItem('persist:auth');
      })
      // .addCase(refresh.pending, state => {
      //   state.isRefreshing = true;
      // })
      // .addCase(refresh.fulfilled, (state, action) => {
      //   state.user = action.payload.user;
      //   state.token = action.payload.accessToken;
      //   state.isLoggedIn = true;
      //   state.isRefreshing = false;
      // })
      // .addCase(refresh.rejected, state => {
      //   state.isRefreshing = false;
      // })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.user = {
          ...state.user, // сохраняем существующие свойства
          ...action.payload, // добавляем или обновляем переданные свойства
        };
      })
      .addCase(updateUserAvatar.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(updateUserAvatar.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

// Экшены для слайса
export const { setToken } = slice.actions;

// Экспорт редьюсера
export const authReducer = slice.reducer; // Экспорт редьюсера слайса
