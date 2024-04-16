import { call, put, take, takeEvery } from "redux-saga/effects";
import { addCar, addCarSuccess, deleteCar, deleteCarSuccess, getCarsFetch, getCarsSuccess, updateCar } from "./carSlice";

function* workGetCarsFetch() {
  const cars = yield call(() =>
    fetch("http://localhost:9000/api/admin/cars")
  );
  const formatedCars = yield cars.json();
  yield put(getCarsSuccess(formatedCars));
}

function* workAddCar(data) {
  const newCar = data.payload;
  const url = "http://localhost:9000/api/admin/car";
  const response = yield call(() =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newCar),
    })
  );
  if(response.status == 201){
    yield put(getCarsFetch());
  }

}

function* workUpdateCar(data) {
  
  const {newCar, id} = data.payload;
  const url = `http://localhost:9000/api/admin/car/${id}`;
  const response = yield call(() =>
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newCar),
    })
  );
  if(response.status == 200){
    yield put(getCarsFetch());
  }

}

function* workDeleteCar(data) {
  const id = data.payload;
  const url = `http://localhost:9000/api/admin/car/${id}`;
  const response = yield call(() =>
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
  );
  if(response.status === 200){
    yield put(deleteCarSuccess());
    yield put(getCarsFetch());
  }
}

function* carSaga() {
  yield takeEvery(getCarsFetch, workGetCarsFetch);
  yield takeEvery(addCar, workAddCar);
  yield takeEvery(deleteCar, workDeleteCar);
  yield takeEvery(updateCar, workUpdateCar);
}

export default carSaga;
