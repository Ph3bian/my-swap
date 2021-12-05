import { Dispatch } from "react";
import { PoolsAction } from "types";
import { FETCH_POOLS_FAILURE, FETCH_POOLS_SUCCESS } from "./../types";

//  * @FETCH_POOLS
//  * get pools
//  */

export const fetchPools = () => (dispatch: Dispatch<PoolsAction>) =>
  fetch("/data/pools.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return dispatch({
        type: FETCH_POOLS_SUCCESS,
        payload: data.pools,
      });
    })
    .catch(() => {
      return dispatch({
        type: FETCH_POOLS_FAILURE,
      });
    });
