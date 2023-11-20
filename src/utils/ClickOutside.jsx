import { useRef, useEffect } from "react";

export const ClickOutside = ({
  className,
  onClickOutside,
  style = {},
  children,
}) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className={className} style={style} ref={wrapperRef}>
      {children}
    </div>
  );
};
