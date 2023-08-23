import classNames from "classnames";
import { useState } from "react";
import styled from "styled-components";

const History = () => {
  const [enabled, setEnabled] = useState(false);

  const className = classNames({
    enabled: enabled,
    disabled: !enabled,
  });
  return (
    <StyledHistory className={className} onClick={() => setEnabled(!enabled)}>
      <img src={"/icons/history.png"} />
    </StyledHistory>
  );
};

export default History;

const StyledHistory = styled.button`
  display: flex;
  align-items: center;
  width: auto;
  img {
    height: 20px;
  }
`;
