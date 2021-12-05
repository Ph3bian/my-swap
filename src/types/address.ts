
import { FETCH_ADDRESS_SUCCESS, FETCH_ADDRESS_FAILURE } from "store/types";

export interface IAddress {
  isLoading: boolean;
  value: string;
  hasError: boolean;
}

export interface AddressSuccessAction {
  type: typeof FETCH_ADDRESS_SUCCESS;
  payload: string;
}
export interface AddressSuccessFailure {
  type: typeof FETCH_ADDRESS_FAILURE;
}

export type AddressAction = AddressSuccessAction | AddressSuccessFailure;