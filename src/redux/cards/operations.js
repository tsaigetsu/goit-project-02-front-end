import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api.js";
import toast from "react-hot-toast";

export const addCard = createAsyncThunk("addCard", async (data, thunkAPI) => {
  // console.log(columnId + "test logs");
  // console.log("task", data);
  try {
    const response = await api.post("/tasks", data);
    console.log("created card", response.data);
    toast.success("Card created successfully!", {
      duration: 4000,
      position: "bottom-center",
      icon: "✔️",
    });
    return response.data;
  } catch (error) {
    toast.error("Failed to create column: " + error.message, {
      duration: 5000,
      position: "bottom-center",
      icon: "❌",
    });
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateCard = createAsyncThunk(
  "updateCard",
  async ({ cardId, data }, thunkAPI) => {
    console.log(cardId + "card id for update");
    console.log(data + "data for update");

    try {
      const response = await api.patch(`/tasks/${cardId}`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE cards/:id - Видаляє картку за її ID (cardId).
export const deleteCard = createAsyncThunk(
  "deleteCard",
  async (cardId, thunkAPI) => {
    console.log("cardId", cardId);

    try {
      await api.delete(`/tasks/${cardId}`);
      toast.success("Card deleted!", {
        duration: 4000,
        position: "bottom-center",
        icon: "✔️",
      });

      return { cardId }; // Повертаємо ID для видалення з локального стану
    } catch (error) {
      toast.error("Failed to delete card: " + error.message, {
        duration: 5000,
        position: "bottom-center",
        icon: "❌",
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// PATCH cards/:id - Застосовує часткові зміни до картки за її ID (cardId) з новими даними (data).
// export const replaceCard = createAsyncThunk(
//   "cards/replaceCard",
//   async ({ cardId, newColumnId, columnId }, thunkAPI) => {
//     try {
//       const data = { columnId: newColumnId };
//       console.log(data);

//       const response = await taskProApi.patch(`/cards/replace/${cardId}`, data);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
export const replaceCard = createAsyncThunk(
  "replaceCard",
  async ({ cardId, newColumnId, columnId }, thunkAPI) => {
    try {
      const data = { columnId: newColumnId };
      console.log(data);

      const response = await api.patch(`/tasks/${cardId}`, data);

      // Додаємо старий columnId до об'єкта, щоб передати його в slice
      return { ...response.data, oldColumnId: columnId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
