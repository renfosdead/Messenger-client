import classNames from "classnames";
import { useState } from "react";
import styled from "styled-components";

const Refresh = () => {
  const [enabled, setEnabled] = useState(false);

  const className = classNames({
    enabled: enabled,
    disabled: !enabled,
    button: true,
  });
  return (
    <StyledRefresh className={className} onClick={() => setEnabled(!enabled)}>
      <img src={"/icons/refresh.png"} />
    </StyledRefresh>
  );
};

export default Refresh;

const StyledRefresh = styled.button``;
