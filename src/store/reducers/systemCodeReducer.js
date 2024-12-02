const initState = {
  ALLCODE: [],
  ALLCODE_DPZONE: [],
  ALLCODE_DPTYPE: [],
  ALLCODE_SASTATUS: [],
  SASTATUS_SEARCH: [],
  ACCOUNT_TYPE: [],
  KEY_DOWN: false,
  SYSTEMCODES: [],
  DISABLE_FORM: false,
};

// input + output
export const systemCodeReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_ALLCODE":
      return {
        ...state,
        ALLCODE: payload,
      };
    case "SET_ALLCODE_DPZONE":
      return {
        ...state,
        ALLCODE_DPZONE: payload,
      };
    case "SET_ALLCODE_DPTYPE":
      return {
        ...state,
        ALLCODE_DPTYPE: payload,
      };
    case "SET_ALLCODE_SASTATUS":
      return {
        ...state,
        ALLCODE_SASTATUS: payload,
      };
    case "SET_SASTATUS":
      return {
        ...state,
        SASTATUS_SEARCH: payload,
      };
    case "SET_KEY_DOWN":
      return {
        ...state,
        KEY_DOWN: payload,
      };
    case "SET_SYSTEMCODES":
      return {
        ...state,
        SYSTEMCODES: payload,
      };
    case "SET_ACCOUNT_TYPE":
      return {
        ...state,
        ACCOUNT_TYPE: payload,
      };
    case "SET_DISABLE_FORM":
      return {
        ...state,
        DISABLE_FORM: payload,
      };
    default:
      return state;
  }
};
