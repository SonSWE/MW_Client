import { useAxios } from "../../../utils/apiHelper";

export const useBusinessAction = (controller) => {
  const httpRequest = useAxios();

  return {
    GetDetailById: (id) => {
      return httpRequest.get(`/api/cus/job/getdetailbyid?value=${id}`);
    },
    SubmitProposal: (jsonData) =>{
      return httpRequest.post(`/api/cus/proposal/add`, jsonData);
    }
  };
};
