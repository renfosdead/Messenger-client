import styled from "styled-components";
import { statusesCustom } from "@/utils/data";
import { useEffect, useRef } from "react";

const MessageBody = ({ expanded }) => {
  const messages = [
    {
      id: "11",
      status: "read",
      user: "username_me",
      date: "10:59:58 16.06.2014",
      text: "Rororo fjfjjk fjkdjf jkfdjfk jfdkjk  Rororo fjfjjk fjkdjf jkfdjfk jfdkjk Rororo fjfjjk fjkdjf jkfdjfk jfdkjk Rororo fjfjjk fjkdjf jkfdjfk jfdkjk ",
    },
    {
      id: "12",
      status: "unread",
      user: "username_me",
      date: "11:03:44 16.06.2014",
      text: "Rororo fjfjjk fjkdjf jkfdjfk jfdkjk  Rororo fjfjjk fjkdjf jkfdjfk jfdkjk Rororo fjfjjk fjkdjf jkfdjfk jfdkjk Rororo fjfjjk fjkdjf jkfdjfk jfdkjk ",
    },
    {
      id: "13",
      status: "in",
      user: "username_you",
      date: "11:44:44 16.06.2014",
      text: "Rororo fjfjjk fjkdjf jkfdjfk jfdkjk  Rororo fjfjjk fjkdjf jkfdjfk jfdkjk Rororo fjfjjk fjkdjf jkfdjfk jfdkjk Rororo fjfjjk fjkdjf jkfdjfk jfdkjk ",
    },
    {
      id: "14",
      status: "in",
      type: "status",
      pic: 9,
      text: "Ororo",
      additionalText: "Offk jfkfldk kldkf",
    },
    {
      id: "15",
      status: "out",
      type: "status",
      pic: 5,
      text: "Nee )",
      additionalText: "Puk puk puk",
    },
    {
      id: "16",
      status: "read",
      user: "username_me",
      date: "10:59:58 16.06.2014",
      text: "Rororo fjfjjk fjkdjf jkfdjfk jfdkjk  Rororo fjfjjk fjkdjf jkfdjfk jfdkjk Rororo fjfjjk fjkdjf jkfdjfk jfdkjk Rororo fjfjjk fjkdjf jkfdjfk jfdkjk ",
    },
    {
      id: "17",
      status: "unread",
      user: "username_me",
      date: "11:03:44 16.06.2014",
      text: "Rororo fjfjjk fjkdjf jkfdjfk jfdkjk  Rororo fjfjjk fjkdjf jkfdjfk jfdkjk Rororo fjfjjk fjkdjf jkfdjfk jfdkjk Rororo fjfjjk fjkdjf jkfdjfk jfdkjk ",
    },
    {
      id: "18",
      status: "in",
      user: "username_you",
      date: "11:44:44 16.06.2014",
      text: "Rororo fjfjjk fjkdjf jkfdjfk jfdkjk  Rororo fjfjjk fjkdjf jkfdjfk jfdkjk Rororo fjfjjk fjkdjf jkfdjfk jfdkjk Rororo fjfjjk fjkdjf jkfdjfk jfdkjk ",
    },
    {
      id: "19",
      status: "in",
      type: "status",
      pic: 9,
      text: "Ororo",
      additionalText: "Offk jfkfldk kldkf",
    },
    {
      id: "20",
      status: "out",
      type: "status",
      pic: 5,
      text: "Nee )",
      additionalText: "Puk puk puk",
    },
    {
      id: "21",
      status: "read",
      user: "username_me",
      date: "10:59:58 16.06.2014",
      text: "Rororo fjfjjk fjkdjf jkfdjfk jfdkjk  Rororo fjfjjk fjkdjf jkfdjfk jfdkjk Rororo fjfjjk fjkdjf jkfdjfk jfdkjk Rororo fjfjjk fjkdjf jkfdjfk jfdkjk ",
    },
    {
      id: "22",
      status: "unread",
      user: "username_me",
      date: "11:03:44 16.06.2014",
      text: "Rororo fjfjjk fjkdjf jkfdjfk jfdkjk  Rororo fjfjjk fjkdjf jkfdjfk jfdkjk Rororo fjfjjk fjkdjf jkfdjfk jfdkjk Rororo fjfjjk fjkdjf jkfdjfk jfdkjk ",
    },
    {
      id: "23",
      status: "in",
      user: "username_you",
      date: "11:44:44 16.06.2014",
      text: "Rororo fjfjjk fjkdjf jkfdjfk jfdkjk  Rororo fjfjjk fjkdjf jkfdjfk jfdkjk Rororo fjfjjk fjkdjf jkfdjfk jfdkjk Rororo fjfjjk fjkdjf jkfdjfk jfdkjk ",
    },
    {
      id: "24",
      status: "in",
      type: "status",
      pic: 9,
      text: "Ororo",
      additionalText: "Offk jfkfldk kldkf",
    },
    {
      id: "25",
      status: "out",
      type: "status",
      pic: 5,
      text: "Nee )",
      additionalText: "Puk puk puk",
    },
  ];

  const bodyRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [expanded]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (bodyRef.current) {
      bodyRef.current.scrollTo(0, bodyRef.current.scrollHeight);
    }
  };

  return (
    <StyledMessageBody>
      <div ref={bodyRef}>
        {messages.map((mes) => (
          <div key={mes.id}>
            {mes.type === "status" ? (
              <div className={`message-title ${mes.status}`}>
                <img
                  className="img-icon"
                  src={`/statuses_custom/${statusesCustom[mes.pic]}.png`}
                />
                <div>{mes.text}</div>
                <div>{mes.additionalText}</div>
              </div>
            ) : (
              <>
                <div className={`message-title ${mes.status}`}>
                  <img className="img-icon" src={`/icons/${mes.status}.png`} />
                  <div
                    className={mes.status}
                  >{`${mes.user} (${mes.date})`}</div>
                </div>
                <div>{mes.text}</div>
                <div>{mes.additionalText}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </StyledMessageBody>
  );
};

export default MessageBody;

const StyledMessageBody = styled.div`
  position: relative;
  font-size: ${({ theme }) => theme.fontSize};
  overflow: hidden;
  position: relative;
  > div {
    position: absolute;
    left: ${({ theme }) => theme.paddingST};
    right: ${({ theme }) => theme.paddingST};
    top: ${({ theme }) => theme.paddingST};
    bottom: ${({ theme }) => theme.paddingST};
    overflow-y: auto;
  }
  .message-title {
    display: flex;
    gap: ${({ theme }) => theme.paddingST};
    font-size: ${({ theme }) => theme.fontSizeSM};
    align-items: baseline;
    padding-top: ${({ theme }) => theme.paddingST};
    padding-bottom: ${({ theme }) => theme.paddingSM};

    > div:first-of-type {
      font-weight: bold;
    }

    &.in {
      color: ${({ theme }) => theme.inColor};
    }
    &.out,
    &.read,
    &.unread {
      color: ${({ theme }) => theme.outColor};
    }
  }
`;
