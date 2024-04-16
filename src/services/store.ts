import { configureStore } from "@reduxjs/toolkit";

import { holidazeApi } from "./api.reducer";
import dataReducer from "./redux.reducer";
import { useSelector, TypedUseSelectorHook } from "react-redux";


export const store = configureStore({
  reducer: {
    data: dataReducer,
    [holidazeApi.reducerPath]: holidazeApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(holidazeApi.middleware),
});



export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector