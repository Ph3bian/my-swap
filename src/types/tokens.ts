import { FETCH_TOKENS_FAILURE, FETCH_TOKENS_SUCCESS } from "store/types";

export interface IError {
  type: string;
  message: string;
}

export interface ITokens {
  isLoading: boolean;
  tokens: string[];
  hasError: boolean;
}

export interface TokensSuccessAction {
  type: typeof FETCH_TOKENS_SUCCESS;
  payload: string[];
}
export interface TokensSuccessFailure {
  type: typeof FETCH_TOKENS_FAILURE;
}

export type TokenAction = TokensSuccessAction | TokensSuccessFailure;
