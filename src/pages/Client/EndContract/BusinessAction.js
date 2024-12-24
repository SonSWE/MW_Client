import { useAxios } from "../../../utils/apiHelper";
import { CONST_CONTRACT_STATUS } from "../../../utils/constData";

export const useBusinessAction = (controller) => {
  const httpRequest = useAxios();

  return {
    GetContractDetail: (id) => {
      return httpRequest.get(`/api/cus/contract/getdetailbyid?value=${id}`);
    },
    EndContract: (jsondata) => {
      return httpRequest.post(`/api/cus/contract/endcontract`, jsondata);
    },
  };
};
