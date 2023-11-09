import EVENT_TYPES from "shared/src/event_types";
import { EMPTY_PROMISE, isMyMessage } from "./data";
import { renderError } from "@/utils/error";

export const saveFilesFromEvents = async (evts = []) => {
  const promises = [];
  evts.forEach((evt) => {
    promises.push(
      evt.type === EVENT_TYPES.sendImage
        ? attachFile(evt.body.image, isMyMessage(evt))
        : EMPTY_PROMISE
    );
  });

  const fileLinks = await Promise.all(promises);
  fileLinks.forEach((fileLink, i) => {
    if (fileLink) {
      evts[i].body.image = fileLink;
    }
  });

  return evts;
};

const attachFile = async (base64File, isMy) => {
  try {
    const resFile = await getFileFromBase64(base64File);
    const fileLink = await saveFile(resFile, isMy);
    return Promise.resolve(fileLink);
  } catch (err) {
    renderError("Ошибка сохранения картинки");
    return Promise.resolve("");
  }
};

const getFileFromBase64 = async (base64File) => {
  const res = await fetch(base64File);
  const blob = await res.blob();
  const result = new File([blob], `qip_${Date.now()}`, { type: "image/jpg" });
  return Promise.resolve(result);
};

const saveFile = async (resFile, isMy) => {
  const directory = isMy ? "out" : "in";

  const result = URL.createObjectURL(resFile) + "/" + directory;

  return Promise.resolve(result);
};
