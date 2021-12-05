import { FETCH_POOLS_FAILURE, FETCH_POOLS_SUCCESS } from "./../types";
import { IPools, PoolsAction } from "types";

const initialState = {
  isLoading: true,
  pools: [],
  hasError: false,
};

const pools = (state: IPools = initialState, action: PoolsAction): IPools => {
  switch (action.type) {
    case FETCH_POOLS_SUCCESS:
      return {
        ...state,
        pools: action.payload,
        isLoading: false,
        hasError: false,
      };
    case FETCH_POOLS_FAILURE:
      return {
        ...state,
        hasError: true,
      };
    default:
      return state;
  }
};

export default pools;
