import { getUserFromStorage } from "../actions/sharedActions";

const _initUser = getUserFromStorage();

const initState = {
  UserType: _initUser.UserType,
  UserTypeText: _initUser.UserTypeText,
  userId: _initUser.userId,
  access_token: _initUser.access_token,
  SsonData: _initUser.SsonData,
  Refresh_Token: _initUser.Refresh_Token,
  ExpiryTime: _initUser.ExpiryTime,
  //
  username: _initUser.username,
  Full_Name: _initUser.Full_Name,
  Lst_Com_Id: _initUser.Lst_Com_Id,
  Reference_Id: _initUser.Reference_Id,
  Com_Name: _initUser.Com_Name,
  Com_Id: _initUser.Com_Id,
  FunctionSettings: _initUser.FunctionSettings,
};

export const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_USER":
      return {
        ...state,
        UserType: payload.UserType,
        UserTypeText: payload.UserTypeText,
        userId: payload.userId,
        access_token: payload.access_token,
        SsonData: payload.SsonData,
        Refresh_Token: payload.Refresh_Token,
        ExpiryTime: payload.ExpiryTime,
        //
        username: payload.username,
        Full_Name: payload.Full_Name,
        Lst_Com_Id: payload.Lst_Com_Id,
        Reference_Id: payload.Reference_Id,
        Com_Name: payload.Com_Name,
        Com_Id: payload.Com_Id,
        FunctionSettings: payload.FunctionSettings,
      };
    case "CLEAR_USER":
      return {
        ...state,
        userId: 0,
        access_token: "",
        SsonData: "",
        Refresh_Token: "",
        ExpiryTime: null,
        username: "",
        Full_Name: null,
        FunctionSettings: [],
      };
    case "RESET_TOKEN":
      return {
        ...state,
        access_token: payload.access_token,
        Refresh_Token: payload.Refresh_Token,
        ExpiryTime: payload.ExpiryTime,
      };
    default:
      return state;
  }
};
