import { useAxios } from "../../utils/apiHelper";


export const useBusinessAction = (controller) => {
  const httpRequest = useAxios();

  return {
    GetWalletDetail: (id) => {
      return httpRequest.get(`/api/cus/wallet/getdetailbyusername?value=${id}`);
    },
    
    Deposit: (jsonData) => {
      return httpRequest.post(`/api/cus/wallet/deposit`, jsonData);
    },
    Withdraw: (jsonData) => {
      return httpRequest.post(`/api/cus/wallet/withdraw`, jsonData);
    },
    
  };
};
