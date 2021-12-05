export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const UPDATE_TOKENS = "UPDATE_TOKENS";
export const RESET_TOKENS = "RESET_TOKENS";

export const DefaultToken = {
  from: { token: "ETH", value: 0, showModal: false },
  to: { token: "", value: 0, showModal: false },
};

type PayloadType = {
  value?: string | number;
  showModal?: boolean;
  to?: any;
  from?: any;
};

type ACTIONTYPE = {
  type: string;
  tokenType?: string;
  payload: PayloadType;
};

export const TokenReducer = (
  token: any,
  { type, tokenType = "", payload }: ACTIONTYPE
): any => {
  switch (type) {
    case UPDATE_TOKEN:
      return {
        ...token,
        [tokenType]: {
          ...token[tokenType],
          ...payload,
        },
      };
    case UPDATE_TOKENS:
      return {
        ...token,
        from: { ...token.from, ...payload.from },
        to: { ...token.to, ...payload.to },
      };
    case RESET_TOKENS:
      return {
        ...DefaultToken,
      };
    default:
      return token;
  }
};
