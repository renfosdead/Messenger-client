import { useEffect, useState } from "react";
import store from "../utils/store";
import EVENT_TYPES from "shared/src/event_types";

export const useStatus = (userId, events) => {
  const [data, setData] = useState("offline");
  const loadStatusFromEvents = async () => {
    const evts = store.events.get();
    const statusEvents = evts.filter(
      (e) => e.type === EVENT_TYPES.changeStatus && e.userId !== userId
    );
    const lastStatus = statusEvents[statusEvents.length - 1];
    if (lastStatus) {
      setData(lastStatus.status);
    }
  };

  useEffect(() => {
    if (userId) {
      loadStatusFromEvents();
    }
  }, [userId, events]);

  return data;
};
