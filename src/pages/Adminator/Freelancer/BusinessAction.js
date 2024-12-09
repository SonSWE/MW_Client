import { FormFreelancer, FormSpecialty } from "../../../const/FormFreelancer";
import { useAxios } from "../../../utils/apiHelper";
import { convertToArray } from "../../../utils/convertData";

export const useBusinessAction = (controller = "freelancer") => {
  const httpRequest = useAxios();

  return {
    getDetailById: (id) => {
      return httpRequest.get(`/api/sa/${controller}/getdetailbyid?value=${id}`);
    },
    addOne: (jsonData) => {
      if (convertToArray(jsonData?.[FormFreelancer.Skills]).length > 0) {
        jsonData[FormFreelancer.Skills] = convertToArray(jsonData?.[FormFreelancer.Skills]).map((e) => ({
          [FormFreelancer.SkillId]: e,
          [FormFreelancer.FreelancerId]: jsonData?.[FormFreelancer.FreelancerId],
        }));
      }

      if (convertToArray(jsonData?.[FormFreelancer.Specialties]).length > 0) {
        jsonData[FormFreelancer.Specialties] = convertToArray(jsonData?.[FormFreelancer.Specialties]).map((e) => ({
          [FormSpecialty.SpecialtyId]: e,
          [FormFreelancer.FreelancerId]: jsonData?.[FormFreelancer.FreelancerId],
        }));
      }
      return httpRequest.post(`/api/sa/${controller}/add`, jsonData);
    },
    updateOne: (jsonData) => {
      if (convertToArray(jsonData?.[FormFreelancer.Skills]).length > 0) {
        jsonData[FormFreelancer.Skills] = convertToArray(jsonData?.[FormFreelancer.Skills]).map((e) => ({
          [FormFreelancer.SkillId]: e,
          [FormFreelancer.FreelancerId]: jsonData?.[FormFreelancer.FreelancerId],
        }));
      }

      if (convertToArray(jsonData?.[FormFreelancer.Specialties]).length > 0) {
        jsonData[FormFreelancer.Specialties] = convertToArray(jsonData?.[FormFreelancer.Specialties]).map((e) => ({
          [FormSpecialty.SpecialtyId]: e,
          [FormFreelancer.FreelancerId]: jsonData?.[FormFreelancer.FreelancerId],
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
