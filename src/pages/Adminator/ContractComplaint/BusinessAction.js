import { FormContract } from "../../../const/FormContract";
import { useAxios } from "../../../utils/apiHelper";

export const useBusinessAction = (controller = "contract") => {
  const httpRequest = useAxios();

  return {
    getDetailById: (id) => {
      return httpRequest.get(`/api/sa/${controller}/getdetailbyid?value=${id}`);
    },
    Accept: (jsonData) => {
      return httpRequest.post(
        `/api/sa/${controller}/approvalcontractcomplaint?id=${
          jsonData?.[FormContract.ContractId]
        }&status=A`
      );
    },
    Reject: (jsonData) => {
      return httpRequest.post(
        `/api/sa/${controller}/approvalcontractcomplaint?id=${
          jsonData?.[FormContract.ContractId]
        }&status=R`
      );
    },
  };
};
