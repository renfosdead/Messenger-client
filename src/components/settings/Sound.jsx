import classNames from "classnames";
import { useState } from "react";
import styled from "styled-components";
import { useSounds } from "../../hooks/useSounds";

const Sound = () => {
  const { getSoundEnabled, changeSoundEnabled } = useSounds();
  const [enabled, setEnabled] = useState(getSoundEnabled());

  const changeEnabled = () => {
    setEnabled(!enabled);
    changeSoundEnabled(!enabled);
  };

  const soundIcon = enabled
    ? "/icons/sound_enabled.png"
    : "/icons/sound_disabled.png";

  const className = classNames({
    enabled: enabled,
    disabled: !enabled,
    button: true,
  });
  return (
    <StyledSound className={className} onClick={changeEnabled}>
      <img src={soundIcon} />
    </StyledSound>
  );
};

export default Sound;

const StyledSound = styled.button``;
