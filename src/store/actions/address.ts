import { Dispatch } from "react";
import { AddressAction } from "types";
import { FETCH_ADDRESS_SUCCESS, FETCH_ADDRESS_FAILURE } from "../types";

//  * @FETCH_ADDRESS
//  * get address
//  */

export const fetchAddress = () => (dispatch: Dispatch<AddressAction>) =>
  fetch("/data/account.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return dispatch({
        type: FETCH_ADDRESS_SUCCESS,
        payload: data.address,
      });
    })
    .catch(() => {
      return dispatch({
        type: FETCH_ADDRESS_FAILURE,
      });
    });
