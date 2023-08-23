import classNames from "classnames";
import { useState } from "react";
import styled from "styled-components";

const Theme = () => {
  const [enabled, setEnabled] = useState(false);

  const className = classNames({
    enabled: enabled,
    disabled: !enabled,
  });
  return (
    <StyledTheme className={className} onClick={() => setEnabled(!enabled)}>
      <img src={"/icons/theme.png"} />
    </StyledTheme>
  );
};

export default Theme;

const StyledTheme = styled.button``;
