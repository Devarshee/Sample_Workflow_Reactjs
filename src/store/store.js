import vehicleReducer from "../reducers/vehicle/vehicleReducer";
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../reducers/rootSaga";

const rootReducer = combineReducers({
    vehicle: vehicleReducer
  });
  
  const sagaMiddleware = createSagaMiddleware();
  
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  
  sagaMiddleware.run(rootSaga);
  
  export default store;
  