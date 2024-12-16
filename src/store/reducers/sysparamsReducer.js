import moment from "moment/moment";


const initState = {
  SYSPARAMS: [],
  THEME: localStorage.getItem("THEME") ?? "light",
  BUSDATE: moment(),
  SERVERTIME: moment(),
  CONNECTSTATUS: 0,
  SYSTEMINFO: {},
};

// input + output
export const sysparamsReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_THEME":
      return {
        ...state,
        THEME: payload,
      };
    case "SET_SYSPARAMS":
      return {
        ...state,
        SYSPARAMS: payload,
      };
    case "SET_BUSDATE":
      return {
        ...state,
        BUSDATE: payload,
      };
    case "SET_CONNECTSTATUS":
      return {
        ...state,
        CONNECTSTATUS: payload,
      };
    case "SET_SERVERTIME":
      return {
        ...state,
        SERVERTIME: payload,
      };
      case "SET_SYSTEMINFO":
      return {
        ...state,
        SYSTEMINFO: payload,
      };
    default:
      return state;
  }
};
