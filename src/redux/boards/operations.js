import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api.js";

export const fetchBoardsThunk = createAsyncThunk(
  "fetchBoards",
  async (_, thunkApi) => {
    try {
      console.log("hello");

      const response = await api.get("boards");
      console.log(response.data);

      return response.data.data;
    } catch (error) {
      console.log(error.message);

      return thunkApi.rejectWithValue(error.message);
    }
  }
);
fetchBoardsThunk();

export const addBoardsThunk = createAsyncThunk(
  "addBoard",
  async (body, thunkApi) => {
    try {
      const { data } = await api.post("boards", body);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteBoardThunk = createAsyncThunk(
  "deleteBoard",
  async (id, thunkApi) => {
    try {
      await api.delete(`boards/${id}`);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
