import { FETCH_POOLS_SUCCESS, FETCH_POOLS_FAILURE } from "./../store/types";

export interface IPool {
  poolId: string;
  tokenA: string;
  tokenB: string;
  price: string;
}

export interface IPools {
  pools: IPool[];
  isLoading: boolean;
  hasError: boolean;
}

export interface PoolsSuccessAction {
  type: typeof FETCH_POOLS_SUCCESS;
  payload: IPool[];
}
export interface PoolsSuccessFailure {
  type: typeof FETCH_POOLS_FAILURE;
}

export type PoolsAction = PoolsSuccessAction | PoolsSuccessFailure;
