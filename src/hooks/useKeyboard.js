import { useEffect, useState } from "react";
const MIN_KEYBOARD_HEIGHT = 300;

export const useKeyboard = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const listener = () => {
    const isKeyboardOpen =
      window.screen.height - MIN_KEYBOARD_HEIGHT > window.visualViewport.height;
    setIsKeyboardOpen(isKeyboardOpen);
  };

  useEffect(() => {
    window.visualViewport.addEventListener("resize", listener);
    return () => {
      window.visualViewport.removeEventListener("resize", listener);
    };
  }, []);

  return { isKeyboardOpen };
};
