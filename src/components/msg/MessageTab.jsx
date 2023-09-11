import styled from "styled-components";
import Header from "./Header";
import Body from "./Body";
import Text from "./Text";
import { useState } from "react";
import classNames from "classnames";
import { useStatus } from "@/hooks/useStatus";
import { useCustomStatus } from "@/hooks/useCustomStatus";
import { useMessages } from "@/hooks/useMessages";
import { useName } from "../../hooks/useName";

const rows = 4;

const MessageTab = ({
  isActive,
  onClickTab,
  right,
  userId,
  chatId,
  events,
  refresh,
}) => {
  const [showText, setShowText] = useState(false);
  const className = classNames({
    "chat-expanded": showText,
    active: isActive,
  });

  const status = useStatus(userId, events);
  const customStatus = useCustomStatus(userId, events);
  const name = useName(userId, events);

  const { data } = useMessages(events, chatId);
  return (
    <StyledMessageTab className={className}>
      <Header
        isActive={isActive}
        onClickTab={onClickTab}
        right={right}
        userId={userId}
        status={status}
        customStatus={customStatus}
        name={name}
      />
      <Body
        expanded={showText}
        data={data}
        chatId={chatId}
        userName={name}
        events={events}
      />
      <Text
        expanded={showText}
        toggleExpanded={setShowText}
        rows={rows}
        userId={userId}
        chatId={chatId}
        refresh={refresh}
      />
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
        ${rows} * ${({ theme }) => theme.fontSize} + 2 *
          ${({ theme }) => theme.buttonHeight} + 4 *
          ${({ theme }) => theme.paddingST}
      );
  }
  &.active {
    .styled-message-body,
    .styled-text-component {
      z-index: 5;
    }
  }
`;
