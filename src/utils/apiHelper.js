import { SAShare } from "./SAShare";

//
export const useAxios = () => {
  let client = window.axiosClient;

  //
  let clientHelper = {
    get: (url, config) => client.get(url, config),
    getAsync: async (url, config) => await client.get(url, config),
    post: (url, payload, config) => client.post(url, payload, config),
    postAsync: async (url, payload, config) => await client.post(url, payload, config),
    patch: (url, payload, config) =>
      client.patch(
        url,
        {
          ...payload,
        },
        config
      ),
    delete: (url, payload, config) =>
      client.delete(
        url,
        {
          data: {
            ...payload,
          },
        },
        config
      ),
    put: (url, payload, config) =>
      client.put(
        url,
        {
          ...payload,
        },
        config
      ),
    postFile: (url, file, config) =>
      client.post(url, file, {
        ...config,
        headers: {
          "Content-Type": undefined,
        },
      }),
    collections: {
      SAShare: { ...SAShare(client) },
    },
    inquiry: (inquiry) => {
      return client.post(`api/sa/search/inquiry`, inquiry );
    },
    Login: (jsonData) => {
      return client.post("api/auth/token/auth", jsonData);
    },
    RefreshToken: (jsonData) => {
      return client.post("api/auth/token/auth", jsonData);
    },
    Checkalive: () => {
      return client.get("api/auth/token/checkalive");
    },
    Logout: (prop) => {
      return client.post("api/auth/token/logout", { refresh_token: prop });
    },
    client: client,
  };

  return clientHelper;
};
