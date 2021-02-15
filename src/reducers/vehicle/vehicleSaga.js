import axios from "axios";
import { put, all, takeEvery } from "redux-saga/effects";
import * as actionTypes from "../../actions/actions";

export function* fetchVehicles() {
  try {

    const { data } = yield axios.get(`http://localhost:5000/api/getVehicles`);

    yield put({
      type: actionTypes.FETCH_VEHICLE_SUCCESS,
      vehicles: data.data
    });
  } catch (err) {
    yield put({
      type: actionTypes.FETCH_VEHICLE_FAILIUR,
      err: err
    });
  }
}

export function* fetchSearchVehicle(payload) {
  const { id } = payload;
  try {

    const { data } = yield axios.post(
      `http://localhost:5000/api/findSearchVehicle`,
      payload
    );
    yield put({
      type: actionTypes.FETCH_SEARCH_VEHICLE_SUCCESS,
      vehicles: data.data
    });
  } catch (err) {
    yield put({
      type: actionTypes.FETCH_SEARCH_VEHICLE_FAILIUR,
      err: err
    });
  }
}

export function* addVehicle(payload) {
  try {

    const { data } = yield axios.post(
      `http://localhost:5000/api/addVehicle`,
      payload
    );
    yield put({
      type: actionTypes.ADD_VEHICLE_SUCCESS,
      newvehicle: data.data
    });
  } catch (err) {
    yield put({
      type: actionTypes.ADD_VEHICLE_FAILIUR,
      err: err
    });
  }
}

export function* updateVehicle(payload) {
  try {
    const {obj} = payload;
    const { data } = yield axios.post(
      `http://localhost:5000/api/updateVehicle`,
      obj
    );
    yield put({
      type: actionTypes.UPDATE_VEHICLE_SUCCESS,
      updatedVehicle: data.data,
      vehicles: data.allVehicles
    });
  } catch (err) {
    yield put({
      type: actionTypes.UPDATE_VEHICLE_FAILIUR,
      err: err
    });
  }
}


export function* fetchVehicleById(payload) {
  const { id } = payload;
  try {

    const { data } = yield axios.post(
      `http://localhost:5000/api/fetchVehicleById`,
      payload
    );
    yield put({
      type: actionTypes.FETCH_VEHICLE_BY_ID_SUCCESS,
      vehicle: data.data
    });
  } catch (err) {
    yield put({
      type: actionTypes.FETCH_VEHICLE_BY_ID_FAILIUR,
      err: err
    });
  }
}

export function* countVehicleStatus() {
  try {

    const { data } = yield axios.get(
      `http://localhost:5000/api/countVehicleStatus`
    );
    yield put({
      type: actionTypes.COUNT_VEHICLE_STATUS_SUCCESS,
      data: data.data
    });
  } catch (err) {
    yield put({
      type: actionTypes.COUNT_VEHICLE_STATUS_FAILIUR,
      err: err
    });
  }
}

export function* markSoldVehicle(payload) {
  try {
    const {obj} = payload;
    const { data } = yield axios.post(
      `http://localhost:5000/api/markSoldVehicle`,
      obj
    );
    yield put({
      type: actionTypes.UPDATE_VEHICLE_SUCCESS,
      updatedVehicle: data.data,
      vehicles: data.allVehicles
    });
  } catch (err) {
    yield put({
      type: actionTypes.UPDATE_VEHICLE_FAILIUR,
      err: err
    });
  }
}

export function* vehicleSaga() {

  yield all([
    takeEvery(actionTypes.FETCH_VEHICLE_REQUEST, fetchVehicles),
    takeEvery(actionTypes.FETCH_SEARCH_VEHICLE_REQUEST, fetchSearchVehicle),
    takeEvery(actionTypes.ADD_VEHICLE_REQUEST, addVehicle),
    takeEvery(actionTypes.UPDATE_VEHICLE_REQUEST, updateVehicle),
    takeEvery(actionTypes.FETCH_VEHICLE_BY_ID_REQUEST, fetchVehicleById),
    takeEvery(actionTypes.COUNT_VEHICLE_STATUS_REQUEST, countVehicleStatus),
    takeEvery(actionTypes.MARK_SOLD_VEHICLE_REQUEST, markSoldVehicle)
  ]);
}