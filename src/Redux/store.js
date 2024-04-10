import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import carsReducer from "./carSlice/carSlice.js";
import carSaga from "./carSlice/carSaga.js";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
  middleware: () => [saga],
});


saga.run(carSaga);
