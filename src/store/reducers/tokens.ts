import { FETCH_TOKENS_FAILURE, FETCH_TOKENS_SUCCESS } from "./../types";
import { ITokens, TokenAction } from "types";
const initialState = {
  isLoading: true,
  tokens: [],
  hasError: false,
};

const tokens = (
  state: ITokens = initialState,
  action: TokenAction
): ITokens => {
  switch (action.type) {
    case FETCH_TOKENS_SUCCESS:
      return {
        ...state,
        tokens: action.payload,
        isLoading: false,
        hasError: false,
      };
    case FETCH_TOKENS_FAILURE:
      return {
        ...state,
        hasError: true,
      };
    default:
      return state;
  }
};

export default tokens;
