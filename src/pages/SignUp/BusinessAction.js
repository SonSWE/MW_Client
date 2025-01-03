import { FormFreelancer, FormSpecialty } from "../../const/FormFreelancer";
import { useAxios } from "../../utils/apiHelper";
import { convertToArray } from "../../utils/convertData";

export const useBusinessAction = (controller) => {
  const httpRequest = useAxios();

  return {
    SignUpFreelancer: (jsonData) => {
      if (convertToArray(jsonData?.[FormFreelancer.Skills]).length > 0) {
        jsonData[FormFreelancer.Skills] = convertToArray(jsonData?.[FormFreelancer.Skills]).map(
          (e) => ({
            [FormFreelancer.SkillId]: e,
            [FormFreelancer.FreelancerId]: jsonData?.[FormFreelancer.FreelancerId],
          })
        );
      }

      if (convertToArray(jsonData?.[FormFreelancer.Specialties]).length > 0) {
        jsonData[FormFreelancer.Specialties] = convertToArray(
          jsonData?.[FormFreelancer.Specialties]
        ).map((e) => ({
          [FormSpecialty.SpecialtyId]: e,
          [FormFreelancer.FreelancerId]: jsonData?.[FormFreelancer.FreelancerId],
        }));
      }
      return httpRequest.post(`/api/cus/user/signupfreelancer`, jsonData);
    },
    SignUpClient: (jsonData) => {
      return httpRequest.post(`/api/cus/user/signupclient`, jsonData);
    },
  };
};
