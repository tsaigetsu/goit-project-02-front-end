import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { api } from "../../api.js";

export const onCreateColumn = createAsyncThunk(
  "addColumn",
  async (newColumn, thunkAPI) => {
    console.log("Attempting to add column:", { newColumn });
    try {
      const response = await api.post("columns", newColumn);

      console.log("API response:", response.data.data);
      const CreatedColumn = response.data.data;

      toast.success("Column created successfully!", {
        duration: 4000,
        position: "bottom-center",
        icon: "✔️",
      });
      return { boardId: CreatedColumn.boardId, column: CreatedColumn };
    } catch (error) {
      toast.error("Failed to create column: " + error.message, {
        duration: 5000,
        position: "bottom-center",
        icon: "❌",
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const onDeleteColumn = createAsyncThunk(
  "deleteColumn",
  async ({ boardId, columnId }, thunkAPI) => {
    try {
      await api.delete(`columns/${columnId}`);
      toast.success("Column deleted!", {
        duration: 4000,
        position: "bottom-center",
        icon: "✔️",
      });
      return { boardId, columnId };
    } catch (error) {
      toast.error("Failed to delete column: " + error.message, {
        duration: 5000,
        position: "bottom-center",
        icon: "❌",
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const onEditColumn = createAsyncThunk(
  "editColumn",
  async ({ boardId, columnId, updateColumn }, thunkAPI) => {
    try {
      const response = await api.patch(`columns/${columnId}`, updateColumn);
      toast.success("Column updated successfully!", {
        duration: 4000,
        position: "bottom-center",
        icon: "✔️",
      });
      return { boardId, updatedColumn: response.data };
    } catch (error) {
      toast.error("Failed to update column: " + error.message, {
        duration: 5000,
        position: "bottom-center",
        icon: "❌",
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const onGetColumn = createAsyncThunk(
  "getColumn",
  async (columns, thunkAPI) => {
    try {
      return columns;
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

export const onGetColumn = createAsyncThunk(
  "getColumn",
  async (columns, thunkAPI) => {
    try {
      return columns;
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
