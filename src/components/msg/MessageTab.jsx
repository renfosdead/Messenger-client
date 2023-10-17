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
import { useKeyboard } from "../../hooks/useKeyboard";

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
  const { isKeyboardOpen } = useKeyboard();

  const [showText, setShowText] = useState(false);
  const className = classNames({
    "chat-expanded": showText,
    "with-keyboard": isKeyboardOpen,
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
        refresh={refresh}
        isKeyboardOpen={isKeyboardOpen}
      />
      <Text
        expanded={showText}
        toggleExpanded={setShowText}
        rows={rows}
        userId={userId}
        chatId={chatId}
        refresh={refresh}
        isKeyboardOpen={isKeyboardOpen}
      />
    </StyledMessageTab>
  );
};

export default MessageTab;

const StyledMessageTab = styled.div`
  position: relative;
  height: calc(
    100vh - 2 * ${({ theme }) => theme.buttonHeight} - 2 *
      ${({ theme }) => theme.borderWidth}
  );
  border: ${({ theme }) => theme.borderWidth} solid
    ${({ theme }) => theme.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${({ theme }) => theme.fontSize};
  display: grid;
  grid-template-rows: 1fr calc(
      ${({ theme }) => theme.buttonHeight} + ${({ theme }) => theme.borderWidth}
    );
  &.chat-expanded {
    grid-template-rows: 1fr calc(
        ${rows} * ${({ theme }) => theme.fontSize} + 2 *
          ${({ theme }) => theme.buttonHeight} + 7 *
          ${({ theme }) => theme.paddingSM} + 3 *
          ${({ theme }) => theme.paddingST} + 7 *
          ${({ theme }) => theme.borderWidth}
      );

    &.with-keyboard {
      grid-template-rows: 1fr calc(
          ${rows} * ${({ theme }) => theme.fontSize} + 2 *
            ${({ theme }) => theme.paddingLG} + 4 *
            ${({ theme }) => theme.borderWidth}
        );
    }
  }
  &.active {
    .styled-message-body,
    .styled-text-component {
      z-index: 5;
    }
  }
`;
