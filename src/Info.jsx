import classNames from "classnames";
import { useState } from "react";
import styled from "styled-components";

const Info = () => {
  const [enabled, setEnabled] = useState(false);

  const className = classNames({
    enabled: enabled,
    disabled: !enabled,
  });
  return (
    <StyledInfo className={className} onClick={() => setEnabled(!enabled)}>
      <img src={"/icons/info.png"} />
    </StyledInfo>
  );
};

export default Info;

const StyledInfo = styled.button`
  display: flex;
  align-items: center;
  width: auto;
  img {
    height: 20px;
  }
`;
