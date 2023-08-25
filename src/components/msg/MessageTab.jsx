import styled from "styled-components";
import Header from "./Header";
import Body from "./Body";
import Text from "./Text";
import { useState } from "react";
import classNames from "classnames";

const MessageTab = () => {
  const [showText, setShowText] = useState(false);

  const className = classNames({
    "chat-expanded": showText,
  });
  return (
    <StyledMessageTab className={className}>
      <Header />
      <Body expanded={showText} />
      <Text expanded={showText} toggleExpanded={setShowText} />
    </StyledMessageTab>
  );
};

export default MessageTab;

const StyledMessageTab = styled.div`
  position: relative;
  height: calc(100vh - 2 * ${({ theme }) => theme.buttonHeight} - 2px);
  border: ${({ theme }) => theme.borderStyle};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${({ theme }) => theme.fontSize};
  display: grid;
  grid-template-rows: 1fr calc(${({ theme }) => theme.buttonHeight} + 2px);
  &.chat-expanded {
    grid-template-rows: 1fr 338px;
  }
`;
