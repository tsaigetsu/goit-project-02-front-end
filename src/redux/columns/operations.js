import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { api } from "../../api.js";

export const onCreateColumn = createAsyncThunk(
  "addColumn",
  async (newColumn, thunkAPI) => {
    console.log("Attempting to add column:", newColumn);
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
  async (columnId, thunkAPI) => {
    try {
      await api.delete(`columns/${columnId}`);
      toast.success("Column deleted!", {
        duration: 4000,
        position: "bottom-center",
        icon: "✔️",
      });
      return columnId;
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
  async ({ columnId, updateColumn }, thunkAPI) => {
    try {
      console.log("updateColumn", updateColumn);
      console.log("columnId", columnId);

      const response = await api.patch(`columns/${columnId}`, updateColumn);
      console.log("upDateColumn", response.data.data);

      toast.success("Column updated successfully!", {
        duration: 4000,
        position: "bottom-center",
        icon: "✔️",
      });

      return { updatedColumn: response.data.data };
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



export const filterCardsByPriority = createAsyncThunk(
  "columns/filterCardsByPriority",
  async ({ priority }, { getState }) => {
    const state = getState();
    const { allColumns } = state.columns;
    console.log(priority);

    // Фільтруємо картки в колонках на основі пріоритету
    if (priority === "all") {
      return allColumns;
    } else {
      const filteredColumns = allColumns.map((column) => ({
        ...column,
        cards: column.cards.filter((card) => card.priority === priority),
      }));
      console.log(filteredColumns);

      return filteredColumns;
    }
  }
);
