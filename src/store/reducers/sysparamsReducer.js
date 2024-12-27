import moment from "moment/moment";

const initState = {
  SYSPARAMS: [],
  CONNECTSTATUS: 0,
};

// input + output
export const sysparamsReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_SYSPARAMS":
      return {
        ...state,
        SYSPARAMS: payload,
      };
    case "SET_CONNECTSTATUS":
      return {
        ...state,
        CONNECTSTATUS: payload,
      };
    default:
      return state;
  }
};
