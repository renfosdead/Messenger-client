import { useEffect, useState } from "react";
import store from "@/utils/store";
import EVENT_TYPES from "shared/src/event_types";

export const useName = (userId, events) => {
  const [data, setData] = useState("");
  const loadFromEvents = async () => {
    const evts = store.events.get();
    const filterEvents = evts.filter(
      (e) => e.type === EVENT_TYPES.changeName && e.userId !== userId
    );
    const lastEvt = filterEvents[filterEvents.length - 1];
    if (lastEvt) {
      setData(lastEvt.name);
    }
  };

  useEffect(() => {
    if (userId) {
      loadFromEvents();
    }
  }, [userId, events]);

  return data;
};
