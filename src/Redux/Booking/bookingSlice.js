import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    isBooking: false,
    isLoading: false,
    isConfirming: false,
  },
  reducers: {
    getBookings: (state) => {
      state.isLoading = true;
    },
    getBookingsSuccess: (state, action) => {
      state.bookings = action.payload;
      state.isLoading = false;
    },
    getBookingsFailure: (state) => {
      state.isLoading = false;
    },
    confirmBooking: (state) => {
      state.isConfirming = true;
    },
    confirmBookingSuccess: (state) => {
      state.isConfirming = false;
    },
    confirmBookingFailure: (state) => {
      state.isConfirming = false;
    },
  },
});

export const {
  getBookings,
  getBookingsSuccess,
  getBookingsFailure,
  confirmBooking,
  confirmBookingSuccess,
  confirmBookingFailure,
} = bookingSlice.actions;

export default bookingSlice.reducer;
