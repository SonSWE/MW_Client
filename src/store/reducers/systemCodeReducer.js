const initState = {
  SYSTEMCODES: [],
};

// input + output
export const systemCodeReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_SYSTEMCODES":
      return {
        ...state,
        SYSTEMCODES: payload,
      };
    default:
      return state;
  }
};
