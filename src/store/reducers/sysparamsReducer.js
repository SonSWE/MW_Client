import moment from "moment/moment";


const initState = {
  SYSPARAMS: [],
};

// input + output
export const sysparamsReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_SYSPARAMS":
      return {
        ...state,
        SYSPARAMS: payload,
      };
    default:
      return state;
  }
};
