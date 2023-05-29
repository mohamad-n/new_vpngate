import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";

import NetInfo from "@react-native-community/netinfo";
import { delay } from "../libs/tools";

const { BASE_URL, IOS_APP_VERSION, ANDROID_APP_VERSION } = Constants.expoConfig.extra;
const timeout = 6000;
const axiosRequestInstance = axios.create({
  baseURL: BASE_URL,
});

axiosRequestInstance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.data?.message === "ACCESS_TOKEN_EXPIRED" && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return await axiosRequestInstance.request(originalRequest);
    }
    return await handleAxiosResponse(error.response);
  }
);

const sendRequest = async ({ method, url, params, data, hasAuth }) => {
  const { isConnected } = await NetInfo.fetch();
  if (!isConnected) {
    return handleAxiosResponse({ status: 600 });
  }
  let headers = {
    Accept: "application/json",
    // "x-app-version": JSON.stringify({
    //   version: APP_VERSION,
    //   build: BUILD_NUMBER,
    //   productionMode: !__DEV__,
    // }),
    ...(hasAuth && { authorization: `Bearer ${await AsyncStorage.getItem("@accessToken")}` }),
  };
  const response = await axiosRequestInstance({
    method,
    url,
    params,
    data,
    headers,
    timeout,
  });
  return handleAxiosResponse(response);
};

const refreshAccessToken = () => {
  return new Promise(async (resolve) => {
    let headers = {
      Accept: "application/json",
      authorization: `Bearer ${await AsyncStorage.getItem("@refreshToken")}`,
    };
    const {
      data: {
        result: { accessToken, refreshToken },
      },
    } = await axiosRequestInstance({ method: "GET", url: "/client/token/refresh", headers });
    await AsyncStorage.setItem("@refreshToken", refreshToken);
    await AsyncStorage.setItem("@accessToken", accessToken);
    await delay(2000);
    return resolve(accessToken);
  });
};

const handleAxiosResponse = (response) => {
  return new Promise((resolve, reject) => {
    if (!response || !response.data) {
      return reject("Sorry - something went wrong.");
    }
    const data = response.data;

    switch (Math.floor(response.status / 100)) {
      case 2:
        if (!data.status) {
          return reject(data.message);
        }
        return resolve(data.result);
      case 4:
        return reject(data.message);
      case 5:
        return reject("500 Error Server");
      case 6:
        return reject("Device Offline - Check your internet connection.");
      default:
        return reject("Unknown Error");
    }
  });
};

export const publicService = {
  sendRequest: sendRequest,
};
