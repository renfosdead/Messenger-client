import store from "../utils/store";

export const useSounds = () => {
  const sounds = {
    GetMsg: new Audio("/sounds/get_msg.wav"),
    SendMsg: new Audio("/sounds/send_msg.wav"),
    Startup: new Audio("/sounds/start.wav"),
    UserIn: new Audio("/sounds/user_in.wav"),
  };

  const changeSoundEnabled = (value) => {
    store.sound.set(value);
  };

  const getSoundEnabled = () => {
    const soundEnabled = store.sound.get();
    return soundEnabled === "true" || !soundEnabled;
  };

  const playSound = (key) => {
    const soundEnabled = getSoundEnabled();

    if (soundEnabled) {
      sounds[key] && sounds[key].play();
    }
  };

  return {
    changeSoundEnabled,
    playSound,
    getSoundEnabled,
  };
};
