import { FormJob, FormJobSkill } from "../../../const/FormJob";
import { useAxios } from "../../../utils/apiHelper";
import { convertToArray } from "../../../utils/convertData";

export const useBusinessAction = (controller) => {
  const httpRequest = useAxios();

  return {
    GetDetailById: (id) => {
      return httpRequest.get(`/api/cus/job/getdetailbyid?value=${id}`);
    },
    PostJob: (jsonData) => {
      if (convertToArray(jsonData?.[FormJob.JobSkills]).length > 0) {
        jsonData[FormJob.JobSkills] = convertToArray(jsonData?.[FormJob.JobSkills]).map((e) => ({
          [FormJobSkill.SkillId]: e,
        }));
      }
      return httpRequest.post(`/api/cus/job/add`, jsonData);
    },
  };
};
