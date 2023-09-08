import { useEffect, useState } from "react";
import store from "../utils/store";
import EVENT_TYPES from "shared/src/event_types";

export const useMessages = (events, chatId) => {
  const [data, setData] = useState([]);
  const loadFromEvents = async () => {
    const evts = store.events.get();
    const statusEvents = evts.filter(
      (e) => e.type === EVENT_TYPES.changeCustomStatus && e.chatId === chatId
    );
    const lastStatus = statusEvents[statusEvents.length - 1];
    if (lastStatus && !data.find((e) => e.id === lastStatus.id)) {
      setData([...data, lastStatus]);
    }
  };

  useEffect(() => {
    loadFromEvents();
  }, [events, chatId]);

  return { data };
};
