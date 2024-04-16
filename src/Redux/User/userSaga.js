import { call, put, take, takeEvery } from "redux-saga/effects";
import { addFavourite, getFavourites } from "./userSlice";
import { getCarsFetch } from "../carSlice/carSlice";

function* workAddFavourite(data) {
  const { carId, userId } = data.payload;
  const url = `http://localhost:9000/api/admin/favourite/car/${carId}`;
  const response = yield call(() => {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        userId: userId,
      },
    });
  });
  // const res = yield response;
  if (response.status === 200) {
    yield put(getFavourites(userId));
  }
}

function* workGetFavourites(data) {
  const { userId } = data.payload;
  const url = `http://localhost:9000/api/admin/favourite`;
  const response = yield call(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        userId: userId,
      },
    });
  });
  // if (response.status === 200) {
  //   yield put(getCarsFetch());
  // }
}

function* userSaga() {
  yield takeEvery(addFavourite, workAddFavourite);
  yield takeEvery(getFavourites, workGetFavourites);
}

export default userSaga;
