import { useAxios } from "../../../utils/apiHelper";

export const useBusinessAction = (controller) => {
  const httpRequest = useAxios();

  return {
    GetFreelancerDetailById: (id) => {
      return httpRequest.get(`/api/cus/freelancer/getdetailbyid?value=${id}`);
    },
    UpdateAvatar: (jsondata) => {
      return httpRequest.put(`/api/cus/freelancer/updateavatar`, jsondata);
    },
    UpdateSkills: (jsondata) => {
      return httpRequest.put(`/api/cus/freelancer/updateskills`, jsondata);
    },
  };
};
