import { useAxios } from "../../../utils/apiHelper";

export const useBusinessAction = (controller) => {
  const httpRequest = useAxios();

  return {
    GetContractDetail: (id) => {
      return httpRequest.get(`/api/cus/contract/getdetailbyid?value=${id}`);
    },
    DoneContract: (jsondata) => {
      return httpRequest.post(`/api/cus/contract/donecontract`, jsondata);
    },
  };
};
