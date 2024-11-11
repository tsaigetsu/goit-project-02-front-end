import { createSlice } from "@reduxjs/toolkit";
import {
  onCreateColumn,
  onDeleteColumn,
  onEditColumn,
  onGetColumn,
} from "./operations";
import { addCard, deleteCard } from "../cards/operations";
// import AddCardPopup from "../../components/AddCardPopup/AddCardPopup";
// import { logout } from "../auth/operations.js";

const columnsSlice = createSlice({
  name: "columns",
  initialState: {
    columnsByBoard: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(onCreateColumn.pending, (state) => {
        state.loading = true;
      })
      .addCase(onCreateColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { boardId, column } = action.payload;
        if (!state.columnsByBoard[boardId]) {
          state.columnsByBoard[boardId] = [];
        }
        state.columnsByBoard = [...state.columnsByBoard, column];
      })
      .addCase(onGetColumn.fulfilled, (state, { payload }) => {
        state.columnsByBoard = payload; //добавить пендинг и реджектед
      })
      .addCase(onCreateColumn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(onDeleteColumn.pending, (state) => {
        state.loading = true;
      })
      .addCase(onDeleteColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.columnsByBoard.findIndex(
          (column) => column.id === action.payload._id
        );
        state.columnsByBoard.splice(index, 1);
      })
      .addCase(onDeleteColumn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(onEditColumn.pending, (state) => {
        state.loading = true;
      })
      .addCase(onEditColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const columns = state.columnsByBoard;
        const updateColumn = action.payload.updatedColumn;
        const index = columns.findIndex((col) => col._id === updateColumn._id);

        if (index !== -1) {
          columns[index] = updateColumn;
        }
      })
      .addCase(onEditColumn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        const task = action.payload.data;
        const { columnId } = task;
        console.log("action.payload.data", action.payload.data);

        if (!state.columnsByBoard.columns[columnId]) {
          state.columnsByBoard.columns[columnId] = [];
        }
        state.columnsByBoard.columns[columnId] = [
          ...state.columnsByBoard.columns[columnId],
          task,
        ];
      })
      // Видалення картки
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        console.log("action.payload._id", action.payload);
        const cardIdToDelete = action.payload.cardId; // Предположим, что `cardId` приходит в респонсе
        console.log("cardIdToDelete", cardIdToDelete);

        // Проходим по всем колонкам и ищем карточку
        state.columnsByBoard.forEach((column) => {
          // Если карточка с таким id найдена в колонке
          const cardIndex = column.cards.findIndex(
            (card) => card._id === cardIdToDelete
          );

          if (cardIndex !== -1) {
            // Удаляем карточку из массива cards
            column.cards.splice(cardIndex, 1);
          }
        });
      });

    // .addCase(updateCard.fulfilled, (state, action) => {
    //   const { _id, columnId, title, description, deadline, priority } =
    //     action.payload.data;

    //   const column = state.columns.find((col) => col._id === columnId);

    //   if (column) {
    //     const cardIndex = column.cards.findIndex((card) => card._id === _id);

    //     if (cardIndex !== -1) {
    //       column.cards[cardIndex] = {
    //         _id,
    //         title,
    //         description,
    //         deadline,
    //         priority,
    //         columnId,
    //       };
    //     }
    //   }
    // })

    // .addCase(filterCardsByPriority.fulfilled, (state, action) => {
    //   state.columns = action.payload;
    // })

    // .addCase(replaceCard.fulfilled, (state, action) => {
    //   const { data, oldColumnId } = action.payload;

    //   // Знаходимо стару колонку та видаляємо картку з неї
    //   const oldColumn = state.columns.find((col) => col._id === oldColumnId);
    //   if (oldColumn) {
    //     oldColumn.cards = oldColumn.cards.filter(
    //       (card) => card._id !== data._id
    //     );
    //   }

    //   // Додаємо картку в нову колонку
    //   const newColumn = state.columns.find(
    //     (col) => col._id === data.columnId
    //   );
    //   if (newColumn) {
    //     newColumn.cards.push(data);
    //   }
    // })

    // .addCase(logout.fulfilled, (state) => {
    //   state.items = [];
    //   state.error = null;
    //   state.loading = false;
    // });
  },
});

export const columnsReducer = columnsSlice.reducer;
export const selectColumnsByBoard = (state) => {
  return state.columns.columnsByBoard;
};

// export const selectLoading = (state) => state.columns.loading;
// export const selectError = (state) => state.columns.error;
