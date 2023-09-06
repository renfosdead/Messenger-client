import { useState } from "react";
import EventsApi from "@/api/events";
import store from "../utils/store";

export const useEvents = () => {
  const [data, setData] = useState([]);
  const loadEvents = async () => {
    const { data } = await EventsApi.get();
    if (!data.error) {
      setData(data);
      store.events.set(data);
    }
  };

  return { events: data, loadEvents };
};
