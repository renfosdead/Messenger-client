import classNames from "classnames";
import { useState } from "react";
import styled from "styled-components";

const Files = ({ toggleImageViewer, toggleSettings }) => {
  const [enabled, setEnabled] = useState(false);

  const className = classNames({
    enabled: enabled,
    disabled: !enabled,
    button: true,
  });

  const enable = () => {
    setEnabled(!enabled);
    toggleImageViewer(!enabled);
    toggleSettings(false);
  };

  return (
    <StyledFiles className={className} onClick={enable}>
      <img src={"/icons/files.png"} />
    </StyledFiles>
  );
};

export default Files;

const StyledFiles = styled.button``;
