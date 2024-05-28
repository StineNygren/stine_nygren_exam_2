import { RootState } from './store';
import { createSelector, PayloadAction, isRejectedWithValue } from '@reduxjs/toolkit';
import { holidazeApi } from "./api.reducer";
import { createSlice } from "@reduxjs/toolkit";
import { Venue } from "../types/types";

interface State {
    products: Venue[];
    isLoading: boolean;
    errors: ErrorDetail[];
  }
  
  const initialState: State = {
    products: [],
    isLoading: false,
    errors: [],
  };

  interface ErrorDetail {
    code: string;
    message: string;
    path: string[];
}

interface Err {
    status: number;
    data: {
        errors: ErrorDetail[];
    };
    statusText: string;
    statusCode: number;
}
  export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(holidazeApi.endpoints.getVenues.matchPending, (state) => {
                state.isLoading = true;
            })
            .addMatcher(holidazeApi.endpoints.getVenues.matchFulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addMatcher(isRejectedWithValue, (state, action: PayloadAction<unknown>) => {
              state.isLoading = false;
              console.log(action.payload);
              if (isErr(action.payload)) {
                console.log(action.payload);
                state.errors = action.payload.data.errors;
            }else {
                state.errors = [{ code: 'unknown', message: 'An unknown error occurred', path: [] }];            
            }
          });
    },
  });
  function isErr(payload: unknown): payload is Err {
    return (payload as Err).data !== undefined && (payload as Err).status !== undefined;
}  
  export default dataSlice.reducer;

  const errors = (state: RootState) => state.data.errors;

export const errorsSelector = createSelector([errors], (errors) => {
    console.log("Errors selector runned");
    return [...errors];
});
  