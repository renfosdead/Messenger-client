import { useEffect, useState } from "react";
import store from "../utils/store";
import EVENT_TYPES from "shared/src/event_types";

export const useMessages = (events, chatId) => {
  const [data, setData] = useState([]);
  const loadFromEvents = async () => {
    const evts = store.events.get();
    const messageEvents = evts.filter(
      (e) =>
        (e.type === EVENT_TYPES.changeCustomStatus ||
          e.type === EVENT_TYPES.sendMessage) &&
        e.chatId === chatId
    );
    setData([...data, ...messageEvents]);
  };

  useEffect(() => {
    loadFromEvents();
  }, [events, chatId]);

  return { data };
};
