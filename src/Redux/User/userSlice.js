import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    favourites: [],
    isAddingFav: false,
  },
  reducers: {
    addFavourite: (state) => {
      state.isAddingFav = true;
    },
    addFavouriteSuccess: (state, action) => {
      state.isAddingFav = false;
    },
    addFavouriteFailure: (state, action) => {
      state.isAddingFav = false;
    },
    getFavourites: (state) => {
      state.isAddingFav = true;
    },
    getFavouritesSuccess: (state, action) => {
      state.favourites = action.payload;
      state.isAddingFav = false;
    },
    getFavouritesFailure: (state) => {
      state.isAddingFav = false;
    },
  },
});

export const {addFavourite, addFavouriteSuccess, addFavouriteFailure, getFavourites, getFavouritesSuccess, getFavouritesFailure } =
  userSlice.actions;

export default userSlice.reducer;
