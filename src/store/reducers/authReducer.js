import { getUserFromStorage } from "../actions/sharedActions";

const _initUser = getUserFromStorage();

const initState = {
  access_token: _initUser.access_token,
  refresh_token: _initUser.refresh_token,
  expiryTime: _initUser.expiryTime,
  //
  username: _initUser.username,
  fullName: _initUser.fullName,
  userId: _initUser.userId,
  loginType: _initUser.loginType,
  mustChangePassword: _initUser.mustChangePassword,
  userType: _initUser.userType,
  functionSettings: _initUser.functionSettings,
  freelancer: _initUser.freelancer,
  clients: _initUser.clients,
};

export const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_USER":
      return {
        ...state,
        ...payload
      };
    case "CLEAR_USER":
      return {
        ...state,
        userId: 0,
        access_token: "",
        refresh_Token: "",
        expiryTime: null,
        username: "",
        fullName: null,
        functionSettings: [],
      };
    case "RESET_TOKEN":
      return {
        ...state,
        access_token: payload.access_token,
        refresh_Token: payload.refresh_Token,
        expiryTime: payload.expiryTime,
      };
    default:
      return state;
  }
};
