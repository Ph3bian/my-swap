import { ChangeEventHandler, FC, KeyboardEvent } from "react";
import Button from "component/Button";
import Input from "component/Input";
import Modal from "component/Modal";
import CardItem from "component/Card/CardItem";

import TokenSelection from "../TokenSelection";
import { UPDATE_TOKEN } from "./TokenReducer";
import { IBalances } from "types";

type TokenFieldProps = {
  setToken: any;
  balances: IBalances;
  token: any;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  tokenType: string;
  readOnly?: boolean;
  error?: string;
};

const TokenField: FC<TokenFieldProps> = ({
  setToken,
  token,
  readOnly,
  onChange,
  error,
  tokenType = "from",
}) => {
  const toggleModal = () =>
    setToken({
      type: UPDATE_TOKEN,
      tokenType,
      payload: { showModal: !token[tokenType].showModal },
    });

  return (
    <CardItem variant="inputGroup">
      <Button type="button" onClick={toggleModal}>
        {token[tokenType]?.token || "Select token"}
      </Button>
      <Input
        placeholder="0"
        type="number"
        name={tokenType}
        onChange={onChange}
        value={token[tokenType]?.value}
        min={0}
        step="0.0001"
        error={error}
        readOnly={readOnly}
        onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "e" || e.key === "-") {
            e.preventDefault();
            return;
          }
        }}
      />
      {token[tokenType]?.showModal && (
        <Modal title="Select token" handleShow={toggleModal}>
          <TokenSelection
            setToken={setToken}
            tokenType={tokenType}
            token={token}
          />
        </Modal>
      )}
    </CardItem>
  );
};
export default TokenField;
