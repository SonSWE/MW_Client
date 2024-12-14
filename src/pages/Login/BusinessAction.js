import { useAxios } from "../../utils/apiHelper";

export const useBusinessAction = (controller = "systemcode") => {
  const httpRequest = useAxios();

  return {
    Login: (jsonData) => {
      return httpRequest.post("api/auth/token/auth", jsonData);
    },
    RefreshToken: (jsonData) => {
      return httpRequest.post("api/auth/token/auth", jsonData);
    },
    Checkalive: () => {
      return httpRequest.get("api/auth/token/checkalive");
    },
    Logout: (prop) => {
      return httpRequest.post("api/auth/token/logout", { Refresh_Token: prop });
    },
  };
};
