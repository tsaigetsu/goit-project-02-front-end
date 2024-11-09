import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, clearToken, setToken } from "../../api.js";
import toast from "react-hot-toast";

export const logoutThunk = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    await api.post("auth/logout");
    clearToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post("/auth/register", credentials);
      setToken(data.data.accessToken);
      toast.success("Welcome! You are successfully registered.");
      return data;
    } catch (error) {
      toast.error("This email is already registered");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post("/auth/login", credentials);
      setToken(data.data.accessToken);
      toast.success("Welcome! You are logged in.");
      return data;
    } catch (error) {
      toast.error("Incorrect email or password");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const currentUserThunk = createAsyncThunk(
  "currentUser",
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.token;
    if (!savedToken) {
      return thunkAPI.rejectWithValue("Token does not exist!");
    }

    try {
      setToken(savedToken);
      const response = await api.get("/user/profile");

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/user/profile"); // Эндпоинт не требует ID

      console.log("Successfully user", response.data.data);

      return response.data.data; // Возвращаем данные пользователя
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  "user/updateUserAvatar",
  async (formData, thunkAPI) => {
    try {
      const response = await api.patch(`/user/profile`, formData);
      console.log("Successfully update UserData", response.data);
      toast.success("User updated successfully!", {
        duration: 4000,
        position: "top-center",
        icon: "✔️",
      });
      return response.data.data; // Возвращаем обновленные данные пользователя
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
