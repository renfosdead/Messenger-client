import axiosInstance from "@/utils/axios";

export default {
  get() {
    return axiosInstance.get("/chat");
  },
};
