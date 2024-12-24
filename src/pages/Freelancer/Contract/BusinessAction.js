import { CONST_YN } from "../../../const/FormConst";
import { useAxios } from "../../../utils/apiHelper";

export const useBusinessAction = (controller = "freelancer") => {
  const httpRequest = useAxios();

  return {
    GetContactsByFreelancer: (id) => {
      return httpRequest.get(`/api/cus/contract/getbyfreelancer?value=${id}`);
    },
    GetContractResultByContractId: (id) => {
      return httpRequest.get(`/api/cus/contract/getcontractresult?value=${id}`);
    },
    SubmitContract: (jsonData) => {
      return httpRequest.put(`/api/cus/contract/submitcontact`, jsonData);
    },
  };
};
