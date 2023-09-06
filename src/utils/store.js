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

  name: {
    get() {
      return window.localStorage.getItem("name") || "";
    },
    set(value) {
      window.localStorage.setItem("name", value);
    },
    remove() {
      window.localStorage.removeItem("name");
    },
  },

  status: {
    get() {
      return window.localStorage.getItem("status") || "";
    },
    set(value) {
      window.localStorage.setItem("status", value);
    },
    remove() {
      window.localStorage.removeItem("status");
    },
  },

  customStatus: {
    get() {
      const customStatus = window.localStorage.getItem("customStatus");
      if (customStatus) {
        return JSON.parse(customStatus);
      } else {
        return {};
      }
    },
    set(value) {
      window.localStorage.setItem("customStatus", JSON.stringify(value));
    },
    remove() {
      window.localStorage.removeItem("customStatus");
    },
  },

  events: {
    get() {
      const events = window.localStorage.getItem("events");
      if (events) {
        return JSON.parse(events);
      } else {
        return [];
      }
    },
    set(value) {
      const evts = [...this.get(), ...value];
      window.localStorage.setItem("events", JSON.stringify(evts));
    },
    remove() {
      window.localStorage.removeItem("events");
    },
  },
};
