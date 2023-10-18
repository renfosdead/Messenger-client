import { useEffect, useState } from "react";
import store from "../utils/store";
import ThemeConfig from "../theme/config.json";

export const useTheme = () => {
  const [themeState, setThemeState] = useState({});

  const initTheme = () => {
    const themeStore = store.theme.get();
    if (themeStore) {
      setThemeState(themeStore);
    } else {
      setThemeState(ThemeConfig);
    }
  };

  useEffect(() => {
    initTheme();
  }, []);

  const changeTheme = (values) => {
    setThemeState({
      ...themeState,
      ...values,
    });
  };

  const resetTheme = () => {
    store.theme.remove();
    setThemeState(ThemeConfig);
  };

  const saveTheme = () => {
    store.theme.set(themeState);
  };

  return { themeState, changeTheme, saveTheme, resetTheme };
};
