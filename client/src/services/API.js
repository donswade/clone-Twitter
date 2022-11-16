import axios from "axios";
import {getTokens, setAuthToken, setHeaderAuthorization} from "@utils";

const BASE_URL = "/api/v0";
const api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.response.use(res => res.data, async error => {
  const originalRequest = error?.config;

  if (error?.response?.status === 403 && !originalRequest?._retry) {
    originalRequest._retry = true;
    const {refreshToken} = getTokens();
    const {data: {type, accessToken}} = await axios.post(`${BASE_URL}/auth/access`, {refreshToken});
    setHeaderAuthorization(accessToken, type);
    setAuthToken(accessToken);
    originalRequest.headers.Authorization = `${type} ${accessToken}`;

    return api(originalRequest);
  }

  return Promise.reject(error);
});

export const URLS = {
  AUTH: {
    IS_ACCOUNT_EXIST: `/auth/account`,
    AUTHORIZE: `/auth/login`,
    LOGOUT: `/auth/logout`,
  },
  USER: {
    _ROOT: "/user",
  }
}
    /**
     https://axios-http.com/ru/docs/interceptors
     перехват запросов




     **/

export default api;
