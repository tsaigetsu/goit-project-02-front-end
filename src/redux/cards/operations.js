import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api.js";

export const fetchCardsThunk = createAsyncThunk(
    "cards/fetchAll",
    async (_, thunkApi) => {
      try {
        const response = await api.get("cards");
        return response.data.data;
      } catch (error) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
  );
  fetchCardsThunk();

// POST cards with boardId
export const addCard = createAsyncThunk(
  "cards/addCard",
  async ({ columnId, data }, thunkAPI) => {
    console.log(columnId + "test logs");

    console.log(data);
    try {
      const response = await api.post(`/cards/${columnId}`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// PUT cards/:id  update cardId with new data.
export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async ({ cardId, data }, thunkAPI) => {
    console.log(cardId + "card id for update");
    console.log(data + "data for update");

    try {
      const response = await api.patch(`/cards/${cardId}`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE cards/:id  use cardId
export const deleteCard = createAsyncThunk(
    "cards/deleteCard",
    async (cardId, thunkAPI) => {
      try {
        await api.delete(`/cards/${cardId}`);
        return cardId; 
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const replaceCard = createAsyncThunk(
    "cards/replaceCard",
    async ({ cardId, newColumnId, columnId }, thunkAPI) => {
      try {
        const data = { columnId: newColumnId };
        console.log(data);
  
        const response = await api.patch(`/cards/replace/${cardId}`, data);
  
                return { ...response.data, oldColumnId: columnId };
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );