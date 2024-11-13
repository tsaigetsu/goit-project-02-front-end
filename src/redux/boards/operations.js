import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api.js";

export const fetchBoardsThunk = createAsyncThunk(
  "fetchBoards",
  async (_, thunkApi) => {
    try {
      const response = await api.get("boards");
      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

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

export const getBoardByIdThunk = createAsyncThunk(
  "boards/getBoardById",
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await api.get(`boards/${boardId}`);
      console.log("redux, get board by id", response.data.data);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateBoardThunk = createAsyncThunk(
  "boards/updateBoard",
  async ({ boardId, title, iconId, backgroundId }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`boards/${boardId}`, {
        title,
        iconId,
        backgroundId,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update board");
    }
  }
);
