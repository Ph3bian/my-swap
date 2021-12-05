import {
  FETCH_BALANCE_SUCCESS,
  FETCH_BALANCE_FAILURE,
  UPDATE_BALANCE_SUCCESS,
} from "store/types";

export interface IBalance {
  token: string;
  balance: string;
}

export interface IBalances {
  isLoading: boolean;
  balances: IBalance[];
  hasError: boolean;
}

export interface BalanceSuccessAction {
  type: typeof FETCH_BALANCE_SUCCESS;
  payload: IBalance[];
}
export interface BalanceSuccessFailure {
  type: typeof FETCH_BALANCE_FAILURE;
}
export interface UpdateBalanceSuccess {
  type: typeof UPDATE_BALANCE_SUCCESS;
  payload: IBalance[];
}

export type BalanceAction =
| BalanceSuccessAction
| BalanceSuccessFailure
| UpdateBalanceSuccess;