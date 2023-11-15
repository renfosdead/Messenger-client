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
    const resFileBlob = await getFileFromBase64(base64File);
    const fileLink = await saveFile(resFileBlob, `qip_${Date.now()}`, isMy);
    return Promise.resolve(fileLink);
  } catch (err) {
    renderError("Ошибка обработки картинки");
    console.error(err);
    return Promise.resolve("");
  }
};

const getFileFromBase64 = async (base64File) => {
  const res = await fetch(base64File);
  const blob = await res.blob();
  // const result = new File([blob], `qip_${Date.now()}`, { type: "image/jpg" });
  return Promise.resolve(blob);
};

const saveFile = async (fileBlob, fileName, isMy) => {
  const workingDirName = isMy ? OUT_FOLDER : IN_FOLDER;

  const rootDir = await cordovaGetRootDirectory();
  console.log("cordova: root directory:", rootDir);

  const workingDir = await cordovaGetWorkingDirectory(rootDir, workingDirName);
  console.log("cordova: working directory:", workingDir);

  const fileUrl = await cordovaGetFile(workingDir, fileName, fileBlob);

  // const result = URL.createObjectURL(resFileBlob) + "/" + directory;

  return Promise.resolve(fileUrl);
};

const ROOT_DIR_NAME = "QIP";
const IN_FOLDER = "in";
const OUT_FOLDER = "out";

const onError = (err) => {
  renderError(err);
};

const cordovaGetFile = (dirEntry, fileName, fileBlob) =>
  new Promise((resolve) => {
    const callback = (result) => {
      resolve(result);
    };

    const errorCallback = (err) => {
      onError(err);
      resolve("");
    };

    dirEntry.getFile(
      fileName,
      { create: true, exclusive: false },
      function (fileEntry) {
        fileEntry.createWriter(function (fileWriter) {
          fileWriter.onwriteend = function () {
            const fileURL = fileEntry.toURL();
            console.log("Successful file write...", fileURL);
            callback(fileURL);
          };

          fileWriter.onerror = errorCallback;

          fileWriter.write(fileBlob);
        });
      },
      onError
    );
  });

const cordovaGetWorkingDirectory = (rootDir, dirName) =>
  new Promise((resolve) => {
    const callback = (resultEntry) => {
      resolve(resultEntry);
    };

    const errorCallback = (err) => {
      onError(err);
      resolve("");
    };

    rootDir.getDirectory(dirName, { create: true }, callback, errorCallback);
  });

const cordovaGetRootDirectory = () =>
  new Promise((resolve) => {
    const callback = (resultEntry) => {
      resolve(resultEntry);
    };

    const errorCallback = (err) => {
      onError(err);
      resolve("");
    };

    window.resolveLocalFileSystemURL(
      window.cordova.file.dataDirectory,
      function (rootEntry) {
        rootEntry.getDirectory(
          ROOT_DIR_NAME,
          { create: true },
          callback,
          errorCallback
        );
      }
    );
  });

export const cordovaSaveImageToGallery = async (imageSrc) => {
  const imageNativeUrl = await fileUrlToNativePath(imageSrc);

  return new Promise((resolve) => {
    if (window.cordova) {
      window.cordova.plugins.imagesaver.saveImageToGallery(
        imageNativeUrl,
        onSaveImageSuccess,
        onSaveImageError
      );
    } else {
      resolve(false);
    }

    function onSaveImageSuccess() {
      console.log("image save success ", imageSrc);
      resolve(true);
    }

    function onSaveImageError(error) {
      console.log("image save error: ", error, imageSrc);
      onError(error);
      resolve(false);
    }
  });
};

const fileUrlToNativePath = (fileUrl) =>
  new Promise((resolve) => {
    const callback = (resultEntry) => {
      resolve(resultEntry.nativeURL);
    };

    const errorCallback = (err) => {
      onError(err);
      resolve("");
    };
    if (window.resolveLocalFileSystemURL) {
      window.resolveLocalFileSystemURL(fileUrl, callback, errorCallback);
    } else {
      resolve("");
    }
  });
