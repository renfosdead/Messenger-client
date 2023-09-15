import { useRef, useState } from "react";

const TouchProvider = ({
  className,
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
  onSwipeTop = () => {},
  activeZone,
  onSwipeBottom = () => {},
  children,
}) => {
  const divRef = useRef(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);

  const [touchEndX, setTouchEndX] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);

  const onTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    const isLeftSwipe = touchStartX - touchEndX > 150;
    const isRightSwipe = touchStartX - touchEndX < -150;
    const isTopSwipe = touchStartY - touchEndY > 150;
    const isBottomSwipe = touchStartY - touchEndY < -150;

    if (isLeftSwipe) {
      onSwipeLeft();
    }
    if (isRightSwipe) {
      onSwipeRight();
    }
    if (isTopSwipe) {
      const containerHeight = divRef.current.clientHeight;
      if (!activeZone || touchStartY > containerHeight - activeZone) {
        onSwipeTop();
      }
    }
    if (isBottomSwipe) {
      onSwipeBottom();
    }
  };

  return (
    <div
      ref={divRef}
      className={className}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  );
};

export default TouchProvider;
