import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import TouchProvider from "../../utils/TouchProvider";

const MessageBody = ({ expanded, data, userName, events, refresh }) => {
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
  > div {
    position: absolute;
    left: ${({ theme }) => theme.paddingST};
    right: ${({ theme }) => theme.paddingSM};
    top: ${({ theme }) => theme.paddingST};
    bottom: ${({ theme }) => theme.paddingST};
    overflow-y: auto;
  }
`;
