import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import carsReducer from "./carSlice/carSlice.js";
import usersReducer from "./User/userSlice.js"
import carSaga from "./carSlice/carSaga.js";
import userSaga from "./User/userSaga.js";
import bookingSaga from "./Booking/bookingSaga.js";
import bookingReducer from "./Booking/bookingSlice.js";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    users: usersReducer,
    bookings: bookingReducer,
  },
  middleware: () => [saga],
});


saga.run(carSaga);
saga.run(userSaga);
saga.run(bookingSaga);
