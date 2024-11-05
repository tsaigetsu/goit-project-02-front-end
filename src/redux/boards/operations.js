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
      const response = await api.post("boards", body);
      console.log(response.data.data);

      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteBoardThunk = createAsyncThunk(
  "deleteBoard",
  async (_id, thunkApi) => {
    try {
      await api.delete(`boards/${_id}`);
      return _id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
