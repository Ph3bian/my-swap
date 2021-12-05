import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
//components
import Input from "component/Input";
import { ListGroup, ListGroupItem } from "component/ListGroup";
import Chips from "component/Chips";
//store
import { fetchBalances, fetchTokens } from "store/actions";
//styles
import styles from "./TokenSelection.module.scss";
import { UPDATE_TOKEN } from "pages/Home/TokenReducer";
import { IBalance } from "types";

type TokenSelectionProps = {
  setToken: any;
  tokenType: string;
  token: any;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
};

const TokenSelection = ({
  setToken,
  tokenType,
  token,
}: TokenSelectionProps) => {
  const dispatch = useDispatch();
  const { balances } = useSelector((state: any) => state.balances);
  const { tokens } = useSelector((state: any) => state.tokens);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState(tokens);

  useEffect(() => {
    dispatch(fetchBalances());
    dispatch(fetchTokens());
  }, [dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
    if (e.target.value) {
      const filteredResult = tokens.filter((result: string) => {
        return result.toLowerCase().includes(e.target.value);
      });
      setResults(filteredResult);
      return;
    }
    setResults(tokens);
  };
  const handleSelectedToken = (value: string) =>
    setToken({
      type: UPDATE_TOKEN,
      tokenType,
      payload: { token: value, showModal: !token[tokenType].showModal },
    });

  return (
    <div className={styles.TokenSelection}>
      <Input
        value={search}
        label="Search token"
        placeholder=""
        type="search"
        variant="search"
        onChange={handleChange}
      />
      <small>Common bases</small>
      <div className={styles.TokenSelectionChips}>
        {balances.map((balance: IBalance) => (
          <Chips
            onClick={() => handleSelectedToken(balance.token)}
            key={balance.token}
          >
            {balance.token}
          </Chips>
        ))}
      </div>
      <hr className={styles.TokenSelectionBorder} />
      <ListGroup>
        {!search
          ? tokens?.map((token: string) => (
              <ListGroupItem
                key={token}
                className={styles.TokenSelectionList}
                onClick={() => handleSelectedToken(token)}
                hasEvent
              >
                {token}
              </ListGroupItem>
            ))
          : results?.map((result: string) => (
              <ListGroupItem
                key={result}
                className={styles.TokenSelectionList}
                onClick={() => handleSelectedToken(result)}
                hasEvent
              >
                {result}
              </ListGroupItem>
            ))}
        {search && !results.length && (
          <ListGroupItem className={styles.TokenSelectionList}>
            No result found
          </ListGroupItem>
        )}
      </ListGroup>
    </div>
  );
};

export default TokenSelection;
