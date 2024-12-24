export const SAShare = (axiosClient) => {
  return {
    GetSystemCodes: () => {
      return axiosClient.get(
        "/api/sa/sashare/getsystemcodes"
      );
    },
    GetSysParams: () => {
      return axiosClient.get(
        "/api/sa/sashare/getsysparams"
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
