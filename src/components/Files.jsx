import classNames from "classnames";
import { useState } from "react";
import styled from "styled-components";

const Files = () => {
  const [enabled, setEnabled] = useState(false);

  const className = classNames({
    enabled: enabled,
    disabled: !enabled,
    button: true,
  });
  return (
    <StyledFiles className={className} onClick={() => setEnabled(!enabled)}>
      <img src={"/icons/files.png"} />
    </StyledFiles>
  );
};

export default Files;

const StyledFiles = styled.button``;
