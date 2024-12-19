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
    UpdateProposal: (jsonData) => {
      return httpRequest.put(`/api/cus/proposal/update`, jsonData);
    },
    DeleteProposal: (id) => {
      return httpRequest.delete(`/api/cus/proposal/delete`, {
        id: id,
      });
    },
  };
};
