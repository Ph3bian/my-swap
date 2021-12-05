import { combineReducers } from "redux";
import address from "./address";
import balances from "./balances";
import pools from "./pools";
import tokens from "./tokens";

export default combineReducers({
  address,
  balances,
  pools,
  tokens,
});
