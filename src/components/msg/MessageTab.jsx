import styled from "styled-components";
import Header from "./Header";
import Body from "./Body";
import Text from "./Text";
import { useState } from "react";
import classNames from "classnames";
import { useStatus } from "../../hooks/useStatus";

const MessageTab = ({ isActive, onClickTab, right, userId, events }) => {
  const [showText, setShowText] = useState(false);

  const className = classNames({
    "chat-expanded": showText,
  });

  const status = useStatus(userId, events);

  return (
    <StyledMessageTab className={className}>
      <Header
        isActive={isActive}
        onClickTab={onClickTab}
        right={right}
        userId={userId}
        status={status}
      />
      <Body expanded={showText} />
      <Text expanded={showText} toggleExpanded={setShowText} />
    </StyledMessageTab>
  );
};

export default MessageTab;

const StyledMessageTab = styled.div`
  position: relative;
  height: calc(100vh - 3 * ${({ theme }) => theme.buttonHeight} - 2px);
  border: ${({ theme }) => theme.borderStyle};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${({ theme }) => theme.fontSize};
  display: grid;
  grid-template-rows: 1fr calc(${({ theme }) => theme.buttonHeight} + 2px);
  &.chat-expanded {
    grid-template-rows: 1fr calc(
        13 * ${({ theme }) => theme.fontSize} + 2 *
          ${({ theme }) => theme.buttonHeight} + 4 *
          ${({ theme }) => theme.paddingST}
      );
  }
`;
