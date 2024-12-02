import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { systemCodeReducer } from "./systemCodeReducer";


const reducers = combineReducers({
  systemCodeReducer: systemCodeReducer,
  authReducer: authReducer,
});

export default reducers;
