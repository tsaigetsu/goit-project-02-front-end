import { createSlice } from "@reduxjs/toolkit";
import { logoutThunk } from "./operations.js";
import { loginThunk, registerThunk } from "./operations.js";

const initialState = {
  user: {
    name: "",
    email: "",
  },
  token: "",
  isLoggedIn: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(registerThunk.rejected, (state) => {
        state.isLoggedIn = false;
      })

      .addCase(loginThunk.pending, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.isLoggedIn = false;
      });
  },
});

export const authReducer = slice.reducer;
