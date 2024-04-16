import { createSlice } from "@reduxjs/toolkit";

const carSlice = createSlice({
  name: "car",
  initialState: {
    cars: [],
    isLoading: false,
    isAdding: false,
    isDeleting: false,
    isUpdating: false,
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
    updateCar: (state) => {
      state.isUpdating = true;
    },
    updateCarSuccess: (state) => {
      state.isUpdating = false;
    },
    updateCarFailure: (state) => {
      state.isUpdating = false;
    },
    deleteCar: (state) => {
      state.isDeleting = true;
    },
    deleteCarSuccess: (state, action) => {
      state.isDeleting = false;
    },
    deleteCarFailure: (state) => {
      state.isDeleting = false;
    },
  },
});

export const {
  getCarsFetch,
  getCarsSuccess,
  getCarsFailure,
  addCar,
  addCarSuccess,
  addCarFailure,
  updateCar,
  updateCarSuccess,
  updateCarFailure,
  deleteCar,
  deleteCarSuccess,
  deleteCarFailure,
} = carSlice.actions;

export default carSlice.reducer;
