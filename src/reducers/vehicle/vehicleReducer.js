import * as actionTypes from "../../actions/actions";

const initialState = {
  vehicles: [],
  newvehicle: {},
  updatedVehicle: {},
  vehicle: {},
  statusCnt:null
};


const vehicleReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.FETCH_VEHICLE_SUCCESS:
      return {
        ...state,
        vehicles: action.vehicles
      };
    case actionTypes.FETCH_VEHICLE_REQUEST:
      return {
        state
      };
    case actionTypes.FETCH_VEHICLE_FAILIUR:
      return {
        state
      };
    case actionTypes.FETCH_SEARCH_VEHICLE_SUCCESS:
      return {
        ...state,
        vehicles: action.vehicles
      };
    case actionTypes.FETCH_SEARCH_VEHICLE_FAILIUR:
      return {
        state
      };
    case actionTypes.ADD_VEHICLE_SUCCESS:
      return {
        ...state,
        newvehicle: action.newvehicle
      };
    case actionTypes.ADD_VEHICLE_FAILIUR:
      return {
        state
      };
    case actionTypes.UPDATE_VEHICLE_SUCCESS:
      return {
        ...state,
        updatedVehicle: action.updatedVehicle,
        vehicles: action.vehicles
      };
    case actionTypes.UPDATE_VEHICLE_FAILIUR:
      return {
        state
      };
      case actionTypes.MARK_SOLD_VEHICLE_SUCCESS:
      return {
        ...state,
        updatedVehicle: action.updatedVehicle,
        vehicles: action.vehicles
      };
    case actionTypes.MARK_SOLD_VEHICLE_FAILIUR:
      return {
        state
      };
    case actionTypes.FETCH_VEHICLE_BY_ID_SUCCESS:
      return {
        ...state,
        vehicle: action.vehicle
      };
    case actionTypes.FETCH_VEHICLE_BY_ID_FAILIUR:
      return {
        state
      };
    case actionTypes.COUNT_VEHICLE_STATUS_SUCCESS:
      return {
        ...state,
        statusCnt : action.data
      };
    case actionTypes.COUNT_VEHICLE_STATUS_FAILIUR:
      return {
        state
      };
    default:
      return state;
  }
};

export default vehicleReducer;
