import { useEffect, useState } from "react";
import EventsApi from "@/api/events";
import store from "../utils/store";
import { isNewMessage, isOffline } from "../utils/data";
import { useSounds } from "./useSounds";

const TIMEOUT_BIG = 3 * 60 * 1000;
const TIMEOUT_SMALL = 15 * 1000;
const TIMEOUT_DIFF = 5 * 1000;

export const useEvents = () => {
  // const { playSound } = useSounds();

  const [data, setData] = useState([]);
  const saveNewData = (newData = []) => {
    // const oldData = store.events.get();
    store.events.add(newData);
    setData(store.events.get());
    // if (isNewMessage(oldData, store.events.get())) {
    // playSound("GetMsg");
    // }
  };

  const [isLoading, setIsLoading] = useState(false);
  const loadEvents = async () => {
    if (!isOffline()) {
      setIsLoading(true);
      try {
        const events = await EventsApi.get();
        if (!events.data.error) {
          saveNewData(events.data);

          if (events.data.length) {
            reduceRefreshTimeToMin();
          } else {
            addRefreshTime();
          }
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setData(store.events.get());
    }
  };

  useEffect(() => {
    setData(store.events.get());
    return () => clearTimer();
  }, []);

  const [time, setTime] = useState(TIMEOUT_BIG);

  const reduceRefreshTimeToMin = () => {
    setTime(TIMEOUT_SMALL);
  };

  const addRefreshTime = () => {
    let addedTime = time + TIMEOUT_DIFF;
    if (addedTime > TIMEOUT_BIG) {
      addedTime = TIMEOUT_BIG;
    }
    setTime(addedTime);
  };

  useEffect(() => {
    refreshTimer(time);
  }, [time]);

  const [timer, setTimer] = useState(null);
  const clearTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  const refreshTimer = (localTime) => {
    clearTimer();
    setTimer(setInterval(loadEvents, localTime));
  };

  const loadEventsManually = () => {
    reduceRefreshTimeToMin();
    loadEvents();
  };

  return { events: data, isLoading, loadEvents: loadEventsManually };
};
