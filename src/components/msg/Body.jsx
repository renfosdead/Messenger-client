import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import TouchProvider from "../../utils/TouchProvider";

const MessageBody = ({
  expanded,
  data,
  userName,
  events,
  refresh,
  onAnswer,
  theme,
}) => {
  const bodyRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [expanded]);

  const [prevDataLength, setPrevDataLength] = useState(0);
  useEffect(() => {
    if (data.length !== prevDataLength) {
      scrollToBottom();
    }
    setPrevDataLength(data.length);
  }, [data]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (bodyRef.current) {
      setTimeout(() => {
        bodyRef.current.scrollTo(0, bodyRef.current.scrollHeight);
      }, 100);
    }
  };

  return (
    <StyledMessageBody
      className="styled-message-body"
      onSwipeTop={refresh}
      activeZone={100}
    >
      <div ref={bodyRef}>
        {data.map((mes) => (
          <Message
            key={mes.id}
            data={mes}
            userName={userName}
            refresh={refresh}
            onAnswer={onAnswer}
            theme={theme}
          />
        ))}
      </div>
    </StyledMessageBody>
  );
};

export default MessageBody;

const StyledMessageBody = styled(TouchProvider)`
  position: relative;
  background: ${({ theme }) => theme.backgroundColor};
  font-size: ${({ theme }) => theme.fontSize};
  overflow: hidden;
  position: relative;
  border: ${({ theme }) => theme.borderWidth} solid
    ${({ theme }) => theme.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  > div {
    position: absolute;
    left: calc(
      ${({ theme }) => theme.paddingST} + ${({ theme }) => theme.borderRadius} /
        3
    );
    right: calc(
      ${({ theme }) => theme.paddingSM} + ${({ theme }) => theme.borderRadius} /
        3
    );
    top: calc(
      ${({ theme }) => theme.paddingST} + ${({ theme }) => theme.borderRadius} /
        3
    );
    bottom: calc(
      ${({ theme }) => theme.paddingST} + ${({ theme }) => theme.borderRadius} /
        3
    );
    overflow-y: auto;
  }
`;
