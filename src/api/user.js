import axiosInstance from "@/utils/axios";

export default {
  login(payload) {
    return axiosInstance.post("/user/login", payload);
  },
  logout() {
    return axiosInstance.get("/user/logout");
  },
};
