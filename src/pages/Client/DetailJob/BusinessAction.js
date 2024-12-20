import { useAxios } from "../../../utils/apiHelper";
import { CONST_CONTRACT_STATUS } from "../../../utils/constData";

export const useBusinessAction = (controller) => {
  const httpRequest = useAxios();

  return {
    GetDetailJobById: (id) => {
      return httpRequest.get(`/api/cus/job/getdetailbyid?value=${id}`);
    },
    GetDetailById: (id) => {
      return httpRequest.get(`/api/cus/proposal/getdetailbyid?value=${id}`);
    },
    GetProposalByJobId: (id) => {
      return httpRequest.get(`/api/cus/proposal/getproposalbyjobid?value=${id}`);
    },
    GetContactByJobId: (id) => {
      return httpRequest.get(`/api/cus/contract/getbyjobid?value=${id}`);
    },
    GetContractDetail: (id) => {
      return httpRequest.get(`/api/cus/contract/getdetailbyid?value=${id}`);
    },
    DoneContract: (id) => {
      return httpRequest.put(`/api/cus/contract/updatestatus`, {
        Id: id,
        Status: CONST_CONTRACT_STATUS.Done,
      });
    },
  };
};
