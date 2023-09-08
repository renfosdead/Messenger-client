import { useState } from "react";
import EventsApi from "@/api/events";
import store from "../utils/store";

export const useEvents = () => {
  const [data, setData] = useState([]);
  const loadEvents = async () => {
    const events = await EventsApi.get();
    if (!events.data.error) {
      setData([...data, events.data]);
      store.events.set(events.data);
    }
  };

  return { events: data, loadEvents };
};
