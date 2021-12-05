import { Dispatch } from "react";
import { TokenAction } from "types";
import { FETCH_TOKENS_SUCCESS, FETCH_TOKENS_FAILURE } from "../types";

//  * @FETCH_TOKENS
//  * Initiate a get tokens
//  */

export const fetchTokens = () => (dispatch: Dispatch<TokenAction>) =>
  fetch("/data/token.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return dispatch({
        type: FETCH_TOKENS_SUCCESS,
        payload: data.tokens,
      });
    })
    .catch(() => {
      return dispatch({
        type: FETCH_TOKENS_FAILURE,
      });
    });
