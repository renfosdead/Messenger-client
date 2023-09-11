import { useState } from "react";
import EventsApi from "@/api/events";
import store from "../utils/store";

export const useEvents = () => {
  const [data, setData] = useState([]);
  const loadEvents = async () => {
    const events = await EventsApi.get();
    if (!events.data.error) {
      const existed = data.map((e) => e.id);
      const payload = [];
      events.data.forEach((evt) => {
        if (!existed.includes(evt.id)) {
          payload.push(evt);
        }
      });

      setData([...data, ...payload]);
      store.events.set(payload);
    }
  };

  return { events: data, loadEvents };
};
