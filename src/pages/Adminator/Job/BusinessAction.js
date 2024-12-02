import { FormJob, FormJobSkill } from "../../../const/FormJob";
import { useAxios } from "../../../utils/apiHelper";
import { convertToArray } from "../../../utils/convertData";

export const useBusinessAction = (controller = "job") => {
  const httpRequest = useAxios();

  return {
    getDetailById: (id) => {
      return httpRequest.get(`/api/sa/${controller}/getdetailbyid?value=${id}`);
    },
    addOne: (jsonData) => {
      if (convertToArray(jsonData?.[FormJob.JobSkills]).length > 0) {
        jsonData[FormJob.JobSkills] = convertToArray(jsonData?.[FormJob.JobSkills]).map((e) => ({
          [FormJobSkill.SkillId]: e,
        }));
      }
      return httpRequest.post(`/api/sa/${controller}/add`, jsonData);
    },
    updateOne: (jsonData) => {
      if (convertToArray(jsonData?.[FormJob.JobSkills]).length > 0) {
        jsonData[FormJob.JobSkills] = convertToArray(jsonData?.[FormJob.JobSkills]).map((e) => ({
          [FormJobSkill.SkillId]: e,
        }));
      }
      return httpRequest.put(`/api/sa/${controller}/update`, jsonData);
    },
    deleteOne: (id) => {
      return httpRequest.delete(`/api/sa/${controller}/delete`, {
        id: id,
      });
    },
  };
};
