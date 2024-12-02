import { useAxios } from "../../../utils/apiHelper";

export const useBusinessAction = (controller = "sysparam") => {
  const httpRequest = useAxios();

  return {
    getDetailById: (id) => {
      return httpRequest.get(`/api/sa/${controller}/getdetailbyid?value=${id}`);
    },
    addOne: (jsonData) => {
      return httpRequest.post(`/api/sa/${controller}/add`, jsonData);
    },
    updateOne: (jsonData) => {
      return httpRequest.put(`/api/sa/${controller}/update`, jsonData);
    },
    // deleteOne: (id) => {
    //   return httpRequest.delete(`/api/sa/${controller}/delete`, {
    //     id: id,
    //   });
    // },
  };
};
