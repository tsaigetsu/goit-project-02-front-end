import { createSlice } from '@reduxjs/toolkit';
import {
  currentUserThunk,
  fetchUserProfile,
  logoutThunk,
  updateUserAvatar,
} from './operations.js';
import { loginThunk, registerThunk } from './operations.js';

const initialState = {
  user: {
    name: '',
    email: '',
  },
  token: '',
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user.name = action.payload.data.user.name;
        state.user.email = action.payload.data.user.email;
        state.user.theme = action.payload.data.user.theme;
        state.isLoggedIn = true;
      })
      .addCase(registerThunk.rejected, state => {
        state.isLoggedIn = false;
      })

      .addCase(loginThunk.pending, state => {
        state.isLoggedIn = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.rejected, state => {
        state.isLoggedIn = false;
      })
      .addCase(currentUserThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;

        state.user = action.payload;
      })
      .addCase(currentUserThunk.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(currentUserThunk.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
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

export const authReducer = slice.reducer;
