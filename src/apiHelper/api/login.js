import { useAxios } from "../connection/APIConnection";

export const useLoginApi = () => {
  const apiConnection = useAxios();

  return {
    Login: (prop) => {
      return apiConnection.httpRequestNonNotifyV2("POST", "auth/api/token/auth", prop, null, true);
    },
    RefreshToken: (prop) => {
      return apiConnection.httpRequestNonNotifyV2("POST", "auth/api/token/auth", prop, null, false);
    },
    Checkalive: (prop) => {
      return apiConnection.httpRequestNonNotifyV2("GET", "auth/api/token/checkalive", null, null, false);
    },
    Logout: (prop) => {
      return apiConnection.httpRequest("POST", "auth/api/token/logout", null, {Refresh_Token : prop}, true);
    },
  };
};
