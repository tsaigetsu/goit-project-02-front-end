import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

axios.defaults.baseURL = ""; //ссылка на бэк

export const fetchColumns = createAsyncThunk(
  "columns/fetchAllColumns",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/columns");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addColumn = createAsyncThunk(
  "columns/addColumn",
  async (newColumn, thunkAPI) => {
    try {
      const response = await axios.post("/columns", newColumn);
      toast.success("Column created successfully!", {
        duration: 4000,
        position: "top-center",
        icon: "✔️",
      });
      return response.data;
    } catch (error) {
      toast.error("Failed to create column: " + error.message, {
        duration: 5000,
        position: "top-center",
        icon: "❌",
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  "columns/deleteColumn",
  async (columnId, thunkAPI) => {
    try {
      const response = await axios.delete(`/columns/${columnId}`);
      toast.success("Column deleted!", {
        duration: 4000,
        position: "top-center",
        icon: "✔️",
      });
      return response.data;
    } catch (error) {
      toast.error("Failed to delete column: " + error.message, {
        duration: 5000,
        position: "top-center",
        icon: "❌",
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editColumn = createAsyncThunk(
  "column/editColumn",
  async (updateColumn, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/columns/${updateColumn.columnId}`,
        updateColumn.updateColumn
      );
      toast.success("Column updated successfully!", {
        duration: 4000,
        position: "top-center",
        icon: "✔️",
      });
      return response.data;
    } catch (error) {
      toast.error("Failed to update column: " + error.message, {
        duration: 5000,
        position: "top-center",
        icon: "❌",
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
