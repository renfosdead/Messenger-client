import { useEffect, useState } from "react";
import store from "../utils/store";
import EVENT_TYPES from "shared/src/event_types";

export const useCustomStatus = (userId, events) => {
  const [data, setData] = useState({
    status: undefined,
    title: "",
    subtitle: "",
    balloon: false,
  });
  const loadFromEvents = async () => {
    const evts = store.events.get();
    const statusEvents = evts.filter(
      (e) => e.type === EVENT_TYPES.changeCustomStatus && e.userId !== userId
    );
    const lastStatus = statusEvents[statusEvents.length - 1]?.body;
    if (lastStatus) {
      setData(lastStatus.customStatus);
    }
  };

  useEffect(() => {
    if (userId) {
      loadFromEvents();
    }
  }, [userId, events]);

  return data;
};
