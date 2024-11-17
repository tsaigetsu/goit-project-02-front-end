import { createSlice } from '@reduxjs/toolkit';
import {
  currentUserThunk,
  fetchUserProfile,
  logoutThunk,
  updateUserAvatar,
} from './operations.js';
import { loginThunk, registerThunk } from './operations.js';

const initialState = {
  user: null,
  token: null,
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
        //ТуТ ВСЕ ВЕРНО!!!!!
        console.log('user', action.payload.data.user);
        console.log('token', action.payload.accessToken);
        state.user = action.payload.data.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(registerThunk.rejected, state => {
        state.isLoggedIn = false;
      })

      .addCase(loginThunk.pending, state => {
        state.isLoggedIn = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        console.log('TOKEN LOGIN', action.payload);
        state.user = action.payload.userData;
        state.token = action.payload.token; //верно!!!
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.rejected, state => {
        state.isLoggedIn = false;
      })
      .addCase(currentUserThunk.fulfilled, (state, action) => {
        // console.log(
        //   'Стейт после успешного выполнения currentUserThunk:',
        //   state
        // );
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;

        // console.log('USER currentUserThunk!!!', action.payload);
      })
      .addCase(currentUserThunk.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(currentUserThunk.rejected, state => {
        console.log('Стейт после отклонения currentUserThunk:', state);
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

// Экшены для слайса
export const { setToken, clearToken, setUser, clearUser } = slice.actions;

// Экспорт редьюсера
export const authReducer = slice.reducer; // Экспорт редьюсера слайса
