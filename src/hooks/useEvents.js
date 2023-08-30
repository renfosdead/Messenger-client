import { useEffect, useState } from "react";
import EventsApi from "@/api/events";

export const useEvents = () => {
  const [data, setData] = useState([]);
  const loadEvents = async () => {
    const result = await EventsApi.get();
    setData(result.data);
  };
  useEffect(() => {
    loadEvents();
  }, []);

  return { events: data };
};
