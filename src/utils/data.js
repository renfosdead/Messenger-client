const statusesDescription = {
  ready: {
    title: "Готов общаться",
    picture: "statuses/free_for_chat.png",
  },
  angry: {
    title: "Злой",
    picture: "statuses/evil.png",
  },
  depression: {
    title: "Депрессия",
    picture: "statuses/depression.png",
  },
  home: {
    title: "Дома",
    picture: "statuses/home.png",
  },
  work: {
    title: "На работе",
    picture: "statuses/work.png",
  },
  eat: {
    title: "Кушаю",
    picture: "statuses/lunch.png",
  },
  away: {
    title: "Отошел",
    picture: "statuses/away.png",
  },
  na: {
    title: "Недоступен",
    picture: "statuses/not_available.png",
  },
  busy: {
    title: "Занят",
    picture: "statuses/occupied.png",
  },
  danger: {
    title: "Не беспокоить",
    picture: "statuses/do_not_disturb.png",
  },
  online: {
    title: "В сети",
    picture: "statuses/online.png",
  },
  invisible: {
    title: "Невидимый",
    picture: "statuses/invisible.png",
  },
  invisibleAll: {
    title: "Невидим для всех",
    picture: "statuses/invisible_all.png",
  },
  offline: {
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
