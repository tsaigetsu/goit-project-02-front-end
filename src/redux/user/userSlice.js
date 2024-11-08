import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserData } from "./userOperations";

const initialState = {
  name: null,
  photo: null,
  isLoading: false,
  error: null,
};

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchUserData();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.name = payload.data.name; // Оновлення імені
        state.photo = payload.data.photo; // Оновлення фото
      })
      .addCase(getUserData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const userReducer = userSlice.reducer;