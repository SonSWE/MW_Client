import { useAxios } from "../../utils/apiHelper";


export const useBusinessAction = (controller) => {
  const httpRequest = useAxios();

  return {
    VerifyEKYC: (usernamer) => {
      return httpRequest.put(`/api/cus/user/verifyekyc?value=${usernamer}`);
    },
  };
};
