import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { systemCodeReducer } from "./systemCodeReducer";
import { sysparamsReducer } from "./sysparamsReducer";


const reducers = combineReducers({
  systemCodeReducer: systemCodeReducer,
  sysparamsReducer: sysparamsReducer,
  authReducer: authReducer,
});

export default reducers;
