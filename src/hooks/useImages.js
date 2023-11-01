import { useEffect, useState } from "react";
import store from "../utils/store";
import EVENT_TYPES from "shared/src/event_types";

export const useImages = (events) => {
  const [slide, setSlide] = useState(-1);
  const [data, setData] = useState([]);
  const loadFromEvents = async () => {
    const evts = store.events.get();
    const images = evts.filter((e) => e.type === EVENT_TYPES.sendImage);
    setData([...images]);
  };

  useEffect(() => {
    loadFromEvents();
  }, [events]);

  return { slide, setSlide, images: data };
};
