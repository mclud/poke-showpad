import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import apiReducer from "../features/API/apiSlice";
import favsReducer from "../features/favs/favsSlice";
import collectionReducer from "../features/collection/collectionSlice";

export const store = configureStore({
  reducer: {
    api: apiReducer,
    favs: favsReducer,
    collection: collectionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
