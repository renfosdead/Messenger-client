import classNames from "classnames";
import { useState } from "react";
import styled from "styled-components";

const Sound = () => {
  const [enabled, setEnabled] = useState(true);
  const soundIcon = enabled
    ? "/icons/sound_enabled.png"
    : "/icons/sound_disabled.png";

  const className = classNames({
    enabled: enabled,
    disabled: !enabled,
    button: true,
  });
  return (
    <StyledSound className={className} onClick={() => setEnabled(!enabled)}>
      <img src={soundIcon} />
    </StyledSound>
  );
};

export default Sound;

const StyledSound = styled.button``;
