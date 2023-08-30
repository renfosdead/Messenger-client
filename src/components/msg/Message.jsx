import { useState } from "react";
import statusesCustom from "shared/src/custom_statuses";
import styled from "styled-components";
import classNames from "classnames";

const Message = ({ data }) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const onTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    // if (touchStart - touchEnd > 150) {
    //   //  left swipe
    // }

    if (touchStart - touchEnd < -150 && !showLeftPanel) {
      setShowLeftPanel(true);
    } else {
      setShowLeftPanel(false);
    }
  };

  const [showLeftPanel, setShowLeftPanel] = useState(false);

  if (data.type === "status") {
    return (
      <StyledMessage>
        <div className={`message-title ${data.status}`}>
          <div>
            <img
              className="img-icon"
              src={`/statuses_custom/${statusesCustom[data.pic]}.png`}
            />
            <div>{data.text}</div>
            <div>{data.additionalText}</div>
          </div>
        </div>
      </StyledMessage>
    );
  }

  const className = classNames({
    "with-left-panel": showLeftPanel,
  });

  return (
    <StyledMessage
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={className}
    >
      {showLeftPanel && (
        <img className="img-icon btn-remove" src="/icons/remove.png" />
      )}
      <div className={`message-title ${data.status}`}>
        <div>
          <img className="img-icon" src={`/icons/${data.status}.png`} />
          <div className={data.status}>
            {data.user} <span>{`(${data.date})`}</span>
          </div>
        </div>
      </div>
      <div>{data.text}</div>
      <div>{data.additionalText}</div>
    </StyledMessage>
  );
};

export default Message;

const StyledMessage = styled.div`
  .message-title {
    display: flex;
    justify-content: space-between;

    gap: ${({ theme }) => theme.paddingST};
    font-size: ${({ theme }) => theme.fontSizeSM};
    align-items: baseline;
    padding-top: ${({ theme }) => theme.paddingSM};
    padding-bottom: ${({ theme }) => theme.paddingSM};

    > div:first-of-type {
      display: flex;
      align-items: baseline;
      font-weight: bold;
      gap: ${({ theme }) => theme.paddingSM};
      span {
        font-size: ${({ theme }) => theme.fontSizeXS};
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
