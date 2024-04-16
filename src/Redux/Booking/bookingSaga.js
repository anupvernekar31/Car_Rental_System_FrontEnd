import { call, put, take, takeEvery } from "redux-saga/effects";
import { confirmBooking, getBookings, getBookingsSuccess } from "./bookingSlice";

function* workGetBookings() {
  const url = `http://localhost:9000/api/admin/car/bookings`;
  const response = yield call(() =>
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
  );
  const bookings = yield response.json();
  
  yield put(getBookingsSuccess(bookings));
}

function* workConfirmBooking(data){
    const { item, status} = data.payload;
    const url = `http://localhost:9000/api/admin/car/booking/${item.id}/${status}`;
    const response = yield call(() =>
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
  );
  const res = yield response;
  yield put(getBookings())
}

function* bookingSaga() {
  yield takeEvery(getBookings, workGetBookings);
  yield takeEvery(confirmBooking, workConfirmBooking);
}

export default bookingSaga;
