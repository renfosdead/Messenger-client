import classNames from "classnames";
import { useState } from "react";
import styled from "styled-components";

const Key = () => {
  const [enabled, setEnabled] = useState(false);

  const className = classNames({
    enabled: enabled,
    disabled: !enabled,
    button: true,
  });
  return (
    <StyledKey className={className} onClick={() => setEnabled(!enabled)}>
      <img src={"/icons/key2.png"} />
    </StyledKey>
  );
};

export default Key;

const StyledKey = styled.button``;
