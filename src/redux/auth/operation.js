import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, clearToken } from "../../api";

export const logoutThunk = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    await api.post("users/logout");
    clearToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
