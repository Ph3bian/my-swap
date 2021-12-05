import {
  FETCH_BALANCE_FAILURE,
  FETCH_BALANCE_SUCCESS,
  UPDATE_BALANCE_SUCCESS,
} from "../types";
import { IBalances, BalanceAction } from "types";

const initialState = {
  isLoading: true,
  balances: [],
  hasError: false,
};

const balances = (
  state: IBalances = initialState,
  action: BalanceAction
): IBalances => {
  switch (action.type) {
    case FETCH_BALANCE_SUCCESS:
      return {
        ...state,
        balances: action.payload,
        isLoading: false,
        hasError: false,
      };
    case FETCH_BALANCE_FAILURE:
      return {
        ...state,
        hasError: true,
      };
    case UPDATE_BALANCE_SUCCESS:
      return {
        ...state,
        hasError: false,
        isLoading: false,
        balances: [...action.payload],
      };
    default:
      return state;
  }
};

export default balances;
