import { createSlice } from "@reduxjs/toolkit";

const carSlice = createSlice({
  name: "car",
  initialState: {
    cars: [],
    isLoading: false,
    isAdding: false,
  },
  reducers: {
    getCarsFetch: (state) => {
      state.isLoading = true;
    },
    getCarsSuccess: (state, action) => {
      state.cars = action.payload;
      state.isLoading = false;
    },
    getCarsFailure: (state) => {
      state.isLoading = false;
    },
    addCar: (state) => {
      state.isAdding = true;
    },
    addCarSuccess: (state, action) => {
      state.isAdding = false;
    },
    addCarFailure: (state, action) => {
      state.isAdding = false;
    },
  },
});

export const {
  getCarsFailure,
  getCarsSuccess,
  getCarsFetch,
  addCar,
  addCarFailure,
  addCarSuccess,
} = carSlice.actions;

export default carSlice.reducer;
