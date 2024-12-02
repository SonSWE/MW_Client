export const SAShare = (axiosClient) => {
  return {
    GetSystemCodes: () => {
      return axiosClient.get(
        "/api/sa/sashare/getsystemcodes"
      );
    },
    GetSkills: () => {
      return axiosClient.get(
        "/api/sa/sashare/getskills"
      );
    },
    GetSpecialties: () => {
      return axiosClient.get(
        "/api/sa/sashare/getspecialties"
      );
    },
  };
};
