import axios from "axios";
import store from "@/utils/store";
import { renderError } from "@/utils/error";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

const axiosInstance = axios.create(options);

axiosInstance.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  const headers = {
    Authorization: store.token.get(),
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
    cache: "no-store",
  };

  config.headers = {
    ...config.headers,
    ...headers,
  };
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.error) {
      renderError(response.data.error);
    }
    return response;
  },
  (error) => {
    renderError(error);
  }
);

export default axiosInstance;
