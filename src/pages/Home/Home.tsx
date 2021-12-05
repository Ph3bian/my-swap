import {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddress,
  fetchBalances,
  fetchPools,
  updateBalances,
} from "store/actions";
import { IBalance, IError, IPool } from "types/index";
import { financial } from "utils/formatters";

import Button from "component/Button";
import Chips from "component/Chips";
import Card from "component/Card";
import CardItem from "component/Card/CardItem";
import PageLayout from "component/PageLayout";

import TokenField from "./TokenField";

import {
  DefaultToken,
  TokenReducer,
  UPDATE_TOKEN,
  UPDATE_TOKENS,
  RESET_TOKENS,
} from "./TokenReducer";

import styles from "./Home.module.scss";

const Home: FC = () => {
  const dispatch = useDispatch();
  const { isLoading, value } = useSelector((state: any) => state.address);
  const { balances } = useSelector((state: any) => state.balances);
  const { pools } = useSelector((state: any) => state.pools);

  const [token, setToken] = useReducer(TokenReducer, DefaultToken);
  const [poolPrice, setPoolPrice] = useState(0);
  const [globalMessage, setGlobalMessage] = useState<IError | undefined>();
  const [formLoading, setFormLoading] = useState(false);
  useEffect(() => {
    dispatch(fetchAddress());
    dispatch(fetchBalances());
    dispatch(fetchPools());
  }, [dispatch]);

  const convertToken = useCallback(() => {
    const exchangeRate = pools?.find(
      (item: IPool) =>
        item.tokenA === token.from.token && item.tokenB === token.to.token
    );

    if (!exchangeRate && token.from.token && token.to.token) {
      setPoolPrice(0);
      setToken({
        type: UPDATE_TOKEN,
        tokenType: "to",
        payload: {
          value: 0,
        },
      });

      return setGlobalMessage({
        type: "error",
        message: "Pool price is unavailable",
      });
    }
    setGlobalMessage(undefined);
    if (token.from.value && exchangeRate?.price) {
      let value = Number(token.from.value) * Number(exchangeRate?.price);

      setPoolPrice(exchangeRate?.price);
      setToken({
        type: UPDATE_TOKEN,
        tokenType: "to",
        payload: {
          value: value,
        },
      });
    }
  }, [pools, token.from.token, token.from.value, token.to.token]);

  useEffect(() => {
    convertToken();
  }, [convertToken]);
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    tokenType: string
  ) => {
    const value = event.target.value;
    if (tokenType === "to" && value) {
      if (poolPrice) {
        setToken({
          type: UPDATE_TOKENS,
          payload: {
            to: { value },
            from: {
              value: financial(Number(value) / poolPrice),
            },
          },
        });
      }
    }
    setToken({
      type: UPDATE_TOKEN,
      tokenType,
      payload: { value: value },
    });
    return;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    const selectedBalanceIndex = balances?.findIndex(
      (balance: IBalance) => balance.token === token.from.token
    );
    const balance = balances[selectedBalanceIndex]?.balance;

    //simulate loading experience
    setTimeout(() => {
      if (Number(token.from.value) > Number(balance)) {
        setGlobalMessage({ type: "error", message: "Insufficient balance" });
        setFormLoading(false);
        return;
      }
      const balancesCopy = [...balances];
      balancesCopy[selectedBalanceIndex] = {
        token: token.from.token,
        balance: balance - token.from.value,
      };
      dispatch(updateBalances(balancesCopy));

      setToken({
        type: RESET_TOKENS,
        payload: {},
      });
      setFormLoading(false);
      setGlobalMessage({ type: "success", message: "Swap Successful" });
    }, 1500);
  };
  return (
    <PageLayout className={styles.Home}>
      <Chips className={styles.HomeAddress}>
        <span title={value}> {isLoading ? "..." : value}</span>
      </Chips>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardItem className={styles.HomeTitle}>
            Swap Token {poolPrice ? <small>Price: {poolPrice} </small> : null}
          </CardItem>
          <div className={styles.HomeFields}>
            {Object.keys(token).map((tokenType) => (
              <TokenField
                token={token}
                setToken={setToken}
                balances={balances}
                tokenType={tokenType}
                key={tokenType}
                onChange={(e) => handleChange(e, tokenType)}
              />
            ))}
          </div>
          <Button
            isLoading={formLoading}
            isDisabled={
              !token.to.value ||
              !token.from.value ||
              !token.to.token ||
              !token.from.token
            }
            isFullWidth
            type="submit"
            className={styles.HomeButton}
          >
            Perform Swap
          </Button>
        </Card>
      </form>

      {globalMessage?.type && (
        <Chips variant={globalMessage.type}>{globalMessage.message}</Chips>
      )}
    </PageLayout>
  );
};
export default Home;
