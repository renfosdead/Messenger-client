export default {
  userId: {
    get() {
      return window.localStorage.getItem("userId") || "";
    },
    set(value) {
      window.localStorage.setItem("userId", value);
    },
    remove() {
      window.localStorage.removeItem("userId");
    },
  },

  chatId: {
    get() {
      return window.localStorage.getItem("chatId") || "";
    },
    set(value) {
      window.localStorage.setItem("chatId", value);
    },
    remove() {
      window.localStorage.removeItem("chatId");
    },
  },
};
