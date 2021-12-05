import { IAddress, AddressAction } from "types";
import { FETCH_ADDRESS_SUCCESS, FETCH_ADDRESS_FAILURE } from "./../types";

const initialState = {
  isLoading: true,
  value: "",
  hasError: false,
};

const address = (
  state: IAddress = initialState,
  action: AddressAction
): IAddress => {
  switch (action.type) {
    case FETCH_ADDRESS_SUCCESS:
      return {
        ...state,
        value: action.payload,
        isLoading: false,
      };
    case FETCH_ADDRESS_FAILURE:
      return {
        ...state,
        hasError: true,
      };
    default:
      return state;
  }
};

export default address;
