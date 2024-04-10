import { call, put, take, takeEvery } from "redux-saga/effects";
import { addCar, getCarsFetch, getCarsSuccess } from "./carSlice";

function* workGetCarsFetch() {
  const cars = yield call(() =>
    fetch("http://192.168.1.3:9000/api/admin/cars")
  );
  const formatedCars = yield cars.json();
  yield put(getCarsSuccess(formatedCars));
}

function* workAddCar(data) {
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  const newCar = data.payload;
  const url = "http://192.168.1.3:9000/api/admin/car";
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
  console.log('====================================');
  console.log(response);
  console.log('====================================');
//   if(response.status == 201){
//     yield put(getCarsFetch());
//     console.log("QQQQQQQQQQ");
//   }

}

function* carSaga() {
  yield takeEvery(getCarsFetch, workGetCarsFetch);
  yield takeEvery(addCar, workAddCar);
}

export default carSaga;
