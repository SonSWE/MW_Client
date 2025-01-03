import { useAxios } from "../../../utils/apiHelper";

export const useBusinessAction = (controller) => {
  const httpRequest = useAxios();

  return {
    GetDetailJobById: (id) => {
      return httpRequest.get(`/api/cus/job/getdetailbyid?value=${id}`);
    },
    GetDetailById: (id) => {
      return httpRequest.get(`/api/cus/proposal/getdetailbyid?value=${id}`);
    },
    SendOffer: (jsonData) => {
      return httpRequest.post(`/api/cus/contract/sendoffer`, jsonData);
    },
  };
};
