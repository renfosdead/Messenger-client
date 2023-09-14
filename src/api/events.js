import axiosInstance from "@/utils/axios";

export default {
  get() {
    return axiosInstance.get("/events");
  },
  sendMessage(message) {
    return axiosInstance.post("/events/message", { message });
  },
};
