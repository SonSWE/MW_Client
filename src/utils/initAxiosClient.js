import axios from "axios";
import { Modal } from "antd";

import { constHostAddressConfig } from "./constData";
import { getUserFromStorage, removeUserFromStorage, saveUserToStorage } from "../store/actions/sharedActions";

const getToken = () => {
  const userLocalStorage = getUserFromStorage();
  return userLocalStorage?.access_token;
};

export const showError = (error) => {
  let secondsToGo = 5;
  const modal = Modal.error({
    className: "modal-center-notify",
    footer: false,
    closable: true,
    mask: true,
    centered: true,
    title: error?.message ? error.message : "Error",
    content: error?.description ? error?.description : "",
    afterClose: () => error?.handleShowFocusError && error?.handleShowFocusError(),
    // ...error,
  });
  setTimeout(() => {
    modal.destroy();
  }, secondsToGo * 1000);
};

//
let isRefreshing = false;
let subscribers = [];
const ignoreUrls = ["api/auth/token/auth"];

function onRefreshed(isSuccess, token) {
  var callbacks = subscribers;
  subscribers = [];

  callbacks.map((cb) => cb(isSuccess, token));
}

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

//
const client = axios.create({
  baseURL: constHostAddressConfig.ApiHostAddress,
});

client.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${getToken()}`;
  return config;
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error && error.code === "ECONNABORTED") {
      return Promise.reject(error);
    }

    //
    const originalRequest = error.response?.config;

    if (401 === error.response?.status && ignoreUrls.indexOf(error.response.config.url) < 0) {
      if (!isRefreshing) {
        isRefreshing = true;

        //
        const userLocalStorage = getUserFromStorage();
        let userLogin = {
          grant_type: "refresh_token",
          refresh_token: userLocalStorage?.refresh_token,
          client_id: "EPS",
          client_secret: "b0udcdl8k80cqiyt63uq",
          username: userLocalStorage?.username,
          password: "",
          ticket: "string",
          serivceurl: "string",
        };

        client
          .post("/api/auth/token/auth", userLogin)
          .then((res) => {
            if (res.status === 200) {
              userLocalStorage.access_token = res.data.access_token;
              userLocalStorage.refresh_token = res.data.refresh_token;
              userLocalStorage.expiryTime = res.data.expiryTime;
              userLocalStorage.username = res.data.username;

              saveUserToStorage(userLocalStorage);
              window.postMessage({ type: "RESET_TOKEN", payload: res.data });
              onRefreshed(true, res.data.access_token);
            } else {
              removeUserFromStorage();
              window.postMessage({ type: "CLEAR_USER" });
              onRefreshed(false);
            }
          })
          .catch(() => {
            removeUserFromStorage();
            window.postMessage({ type: "CLEAR_USER" });
            onRefreshed(false);
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      //
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((isSuccess, token) => {
          if (isSuccess) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(client(originalRequest));
          } else {
            reject();
          }
        });
      });
    }

    return Promise.reject(error);
  }
);

window.axiosClient = client;
