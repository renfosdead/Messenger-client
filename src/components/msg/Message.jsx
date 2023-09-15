import { useState } from "react";
import styled from "styled-components";
import classNames from "classnames";
import EVENT_TYPES from "shared/src/event_types";
import store from "@/utils/store";
import { getDateFormatted } from "@/utils/date_time";
import TouchProvider from "../../utils/TouchProvider";

const Message = ({ data, userName, refresh }) => {
  const userId = store.userId.get();

  const onSwipeRight = () => {
    setShowLeftPanel(true);
  };

  const onSwipeLeft = () => {
    setShowLeftPanel(false);
  };

  const removeMessage = () => {
    store.events.removeMessage(data.id);
    refresh();
  };

  const getMessageStatus = () => {
    if (data.userId === userId) {
      if (data.addresses === null) {
        return "read";
      }
      return "out";
    }
    return "in";
  };

  const getMessageTitle = () => {
    if (data.userId === userId) {
      return store.name.get();
    }
    return userName;
  };

  const [showLeftPanel, setShowLeftPanel] = useState(false);

  if (data.type === EVENT_TYPES.changeCustomStatus) {
    const payload = data.customStatus;

    if (!payload.status) {
      return null;
    }

    return (
      <StyledMessage>
        <div className={`message-title status ${getMessageStatus()}`}>
          <div>
            <img
              className="img-icon"
              src={`/statuses_custom/${payload.status}.png`}
            />
            <div className="status-title">{`${payload.title} `}</div>
            <div>{payload.subtitle}</div>
          </div>
        </div>
      </StyledMessage>
    );
  }

  const className = classNames({
    "with-left-panel": showLeftPanel,
  });

  const messageStatus = getMessageStatus();
  return (
    <StyledMessage
      onSwipeRight={onSwipeRight}
      onSwipeLeft={onSwipeLeft}
      className={className}
    >
      {showLeftPanel && (
        <img
          className="img-icon btn-remove"
          src="/icons/remove.png"
          onClick={removeMessage}
        />
      )}
      <div className={`message-title ${messageStatus}`}>
        <div>
          <img className="img-icon" src={`/icons/${messageStatus}.png`} />
          <div className={messageStatus}>
            {getMessageTitle()}{" "}
            <span>{`(${getDateFormatted(data.date)})`}</span>
          </div>
        </div>
      </div>
      <div className="message-text">{`${data.message}`}</div>
    </StyledMessage>
  );
};

export default Message;

const StyledMessage = styled(TouchProvider)`
  .message-title {
    display: flex;
    justify-content: space-between;

    gap: ${({ theme }) => theme.paddingST};
    font-size: ${({ theme }) => theme.fontSizeXS};
    align-items: baseline;
    padding-top: ${({ theme }) => theme.paddingSM};
    padding-bottom: ${({ theme }) => theme.paddingSM};

    > div:first-of-type {
      display: flex;
      align-items: baseline;
      font-weight: bold;
      gap: ${({ theme }) => theme.paddingSM};
      span {
        font-size: calc(${({ theme }) => theme.fontSizeXS} - 2px);
      }
    }

    &.in {
      color: ${({ theme }) => theme.inColor};
    }
    &.out,
    &.read,
    &.unread {
      color: ${({ theme }) => theme.outColor};
    }

    &.status {
      > div:first-of-type {
        display: inline-block;
        float: left;
        font-weight: normal;
        font-size: ${({ theme }) => theme.fontSizeXS};

        > div,
        img {
          display: inline;
        }
        .status-title {
          font-weight: bold;
        }
        img {
          height: ${({ theme }) => theme.fontSize};
          margin-right: ${({ theme }) => theme.paddingSM};
        }
      }
    }
  }

  .message-text {
    white-space: break-spaces;
  }
  &.with-left-panel {
    padding-left: calc(${({ theme }) => theme.paddingLG} * 4);
    position: relative;
    .btn-remove {
      position: absolute;
      left: 0;
      top: ${({ theme }) => theme.paddingSM};
    }
  }
`;
