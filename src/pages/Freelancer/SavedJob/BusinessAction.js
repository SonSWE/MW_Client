import { CONST_YN } from "../../../const/FormConst";
import { useAxios } from "../../../utils/apiHelper";

export const useBusinessAction = (controller = "freelancer") => {
  const httpRequest = useAxios();

  return {
    GetSuggestByFreelancer: (id) => {
      return httpRequest.get(`/api/cus/job/getsuggestbyfreelancer?value=${id}`);
    },
    GetJobsSaved: (id) => {
      return httpRequest.get(`/api/cus/job/getsavedjobs?value=${id}`);
    },
    GetDetailById: (id) => {
      return httpRequest.get(`/api/cus/job/getdetailbyid?value=${id}`);
    },
    InsertSaveJob: (jsonData) =>{
      return httpRequest.post(`/api/cus/job/insertsavejob`, jsonData);
    },
    RemoveSaveJob: (jsonData) =>{
      return httpRequest.post(`/api/cus/job/removesavejob`, jsonData);
    },
  };
};
