import { Dispatch } from "react";
import { BalanceAction, IBalance } from "types";
import {
  FETCH_BALANCE_SUCCESS,
  FETCH_BALANCE_FAILURE,
  UPDATE_BALANCE_SUCCESS,
} from "./../types";

//  * @FETCH_BALANCE_SUCCESS
//  * Initiate a get balances
//  */

export const fetchBalances = (): any => (dispatch: Dispatch<BalanceAction>) =>
  fetch("/data/balances.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return dispatch({
        type: FETCH_BALANCE_SUCCESS,
        payload: data.balances,
      });
    })
    .catch(() => {
      return dispatch({
        type: FETCH_BALANCE_FAILURE,
      });
    });

export const updateBalances =
  (balance: IBalance[]) => (dispatch: Dispatch<BalanceAction>) => {
    return dispatch({
      type: UPDATE_BALANCE_SUCCESS,
      payload: balance,
    });
  };
