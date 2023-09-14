import { useCallback, useEffect, useState } from "react";
import EventsApi from "@/api/events";
import store from "../utils/store";
import moment from "moment";
import { isOffline } from "../utils/data";

const TIMEOUT_BIG = 3 * 60 * 1000;
const TIMEOUT_SMALL = 30 * 1000;
const TIMEOUT_DIFF = 10 * 1000;

export const useEvents = () => {
  const [data, setData] = useState([]);
  const saveNewData = (newData = []) => {
    const existed = data.map((e) => e.id);
    const payload = [];
    newData.forEach((evt) => {
      if (!existed.includes(evt.id)) {
        payload.push(evt);
      }
    });
    setData([...data, ...payload]);
    store.events.set(payload);
  };

  const [isLoading, setIsLoading] = useState(false);
  const loadEvents = async () => {
    if (!isOffline()) {
      setIsLoading(true);
      const events = await EventsApi.get();
      if (!events.data.error) {
        if (events.data.length) {
          saveNewData(events.data);
          reduceRefreshTimeToMin();
        } else {
          addRefreshTime();
        }
      }
      setIsLoading(false);
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

  const callback = useCallback(() => {
    console.log("callback", moment().format("HH:MM:ss"));
    loadEvents();
  }, [data]);

  const refreshTimer = (localTime) => {
    clearTimer();

    setTimer(setInterval(callback, localTime));
  };

  return { events: data, isLoading, loadEvents };
};
