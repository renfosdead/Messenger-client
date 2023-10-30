import EVENT_TYPES from "shared/src/event_types";
import store from "./store";

export const statusesDescription = {
  ready: {
    key: "ready",
    title: "Готов общаться",
    picture: "statuses/free_for_chat.png",
  },
  angry: {
    key: "angry",
    title: "Злой",
    picture: "statuses/evil.png",
  },
  depression: {
    key: "depression",
    title: "Депрессия",
    picture: "statuses/depression.png",
  },
  home: {
    key: "home",
    title: "Дома",
    picture: "statuses/home.png",
  },
  work: {
    key: "work",
    title: "На работе",
    picture: "statuses/work.png",
  },
  eat: {
    key: "eat",
    title: "Кушаю",
    picture: "statuses/lunch.png",
  },
  away: {
    key: "away",
    title: "Отошел",
    picture: "statuses/away.png",
  },
  na: {
    key: "na",
    title: "Недоступен",
    picture: "statuses/not_available.png",
  },
  busy: {
    key: "busy",
    title: "Занят",
    picture: "statuses/occupied.png",
  },
  danger: {
    key: "danger",
    title: "Не беспокоить",
    picture: "statuses/do_not_disturb.png",
  },
  online: {
    key: "online",
    title: "В сети",
    picture: "statuses/online.png",
  },
  invisible: {
    key: "invisible",
    title: "Невидимый",
    picture: "statuses/invisible.png",
  },
  invisibleAll: {
    key: "invisibleAll",
    title: "Невидим для всех",
    picture: "statuses/invisible_all.png",
  },
  offline: {
    key: "offline",
    title: "Не в сети",
    picture: "statuses/offline.png",
  },
};

export const statuses = [
  statusesDescription.ready,
  statusesDescription.angry,
  statusesDescription.depression,
  statusesDescription.home,
  statusesDescription.work,
  { divider: true },
  statusesDescription.eat,
  statusesDescription.away,
  statusesDescription.na,
  { divider: true },
  statusesDescription.busy,
  statusesDescription.danger,
  statusesDescription.online,
  statusesDescription.invisible,
  statusesDescription.invisibleAll,
  { divider: true },
  statusesDescription.offline,
];

export const isOffline = () => {
  const status = store.status.get();
  return status === "offline" || !status;
};

export const mergeEvents = (oldData, newData) => {
  let payload = [];

  oldData.forEach((oldEvt) => {
    const sameNewEvtIndex = newData.findIndex(
      (newEvt) => newEvt.id === oldEvt.id
    );
    if (sameNewEvtIndex !== -1) {
      payload.push({
        ...oldEvt,
        addresses: newData[sameNewEvtIndex].addresses,
      });
      newData = [
        ...newData.slice(0, sameNewEvtIndex),
        ...newData.slice(sameNewEvtIndex + 1),
      ];
    } else {
      payload.push({ ...oldEvt, addresses: null });
    }
  });

  payload = [...payload, ...newData];

  return payload;
};

const getMessages = (data) => {
  const result = data.filter(
    (item) =>
      (item.type === EVENT_TYPES.sendMessage ||
        item.type === EVENT_TYPES.sendImage) &&
      item.userId !== store.userId.get()
  );
  return result;
};

export const isNewMessage = (oldData, newData) => {
  const oldMessages = getMessages(oldData);
  const newMessages = getMessages(newData);
  return oldMessages.length !== newMessages.length;
};

export const QUOTE_STRING = "|||";

export const getQuote = (message = "") => {
  const quotes = message.split(QUOTE_STRING);
  if (quotes.length % 2 === 1) {
    return quotes.slice(1, quotes.length - 1).join(QUOTE_STRING);
  }
  return "";
};

export const getValueWithoutQuote = (quote, value) => {
  return quote ? value.slice(quote.length + 2 * QUOTE_STRING.length) : value;
};

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
