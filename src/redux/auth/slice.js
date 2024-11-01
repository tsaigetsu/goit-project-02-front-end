import { createSlice } from "@reduxjs/toolkit";
// import { logoutThunk } from "./operations";

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
  // extraReducers: (builder) => {
  //   builder.addCase(logoutThunk.fulfilled, () => {
  //     return initialState;
  //   });
  // },
});

export const authReducer = slice.reducer;
