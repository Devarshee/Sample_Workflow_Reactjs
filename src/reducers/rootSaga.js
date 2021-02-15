import { fetchVehicles, vehicleSaga } from "./vehicle/vehicleSaga";
import { all } from "redux-saga/effects";

export function* rootSaga() {
    yield all([
        vehicleSaga()

    ]);
}
