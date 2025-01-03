import { useAxios } from "../../../utils/apiHelper";
import { CONST_CONTRACT_STATUS } from "../../../utils/constData";

export const useBusinessAction = (controller) => {
  const httpRequest = useAxios();

  return {
    GetContractDetail: (id) => {
      return httpRequest.get(`/api/cus/contract/getdetailbyid?value=${id}`);
    },
    AcceptContract: (id) => {
      return httpRequest.put(`/api/cus/contract/updatestatus`, {
        Id: id,
        Status: CONST_CONTRACT_STATUS.PendingPayment
      });
    },
    RejectContract: (id) => {
      return httpRequest.put(`/api/cus/contract/updatestatus`, {
        Id: id,
        Status: CONST_CONTRACT_STATUS.Rejected
      });
    },
  };
};
