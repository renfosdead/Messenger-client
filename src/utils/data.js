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
