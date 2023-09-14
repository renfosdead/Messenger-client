import axiosInstance from "@/utils/axios";

export default {
  login(payload) {
    return axiosInstance.post("/user/login", payload);
  },
  logout() {
    return axiosInstance.get("/user/logout");
  },
  changeName(name) {
    return axiosInstance.post("/user/name", { name });
  },
  changeStatus(status) {
    return axiosInstance.post("/user/change_status", { status });
  },
  changeCustomStatus(customStatus) {
    return axiosInstance.post("/user/change_custom_status", { customStatus });
  },
};
