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
    GetDetailProposalById: (id) => {
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
    GetContractResultByContractId: (id) => {
      return httpRequest.get(`/api/cus/contract/getcontractresult?value=${id}`);
    },
    PaymentContract: (id) => {
      return httpRequest.post(`/api/cus/contract/paymentcontract?value=${id}`);
    },
    EndContract: (jsondata) => {
      return httpRequest.post(`/api/cus/contract/endcontract`, jsondata);
    },
  };
};
