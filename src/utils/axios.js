import axios from "axios";
import store from "@/utils/store";
import { renderError } from "@/utils/error";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

const axiosInstance = axios.create(options);

axiosInstance.interceptors.request.use((config) => {
  const userId = store.userId.get();
  const chatId = store.chatId.get();

  config.headers = config.headers || {};
  config.headers.userId = userId;
  config.headers.chatId = chatId;

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
