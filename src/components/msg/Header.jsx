import styled from "styled-components";
import Balloon from "@/components/Baloon";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { statusesDescription } from "@/utils/data";
import { useSounds } from "../../hooks/useSounds";

const Header = ({
  isActive,
  onClickTab,
  right,
  userId,
  status,
  customStatus,
  name,
}) => {
  const [enabled, setEnabled] = useState(false);
  const [oldStatus, setOldStatus] = useState("offline");
  const { playSound } = useSounds();

  const className = classnames({
    button: true,
    enabled,
    "open-tab": !enabled,
    right: right,
    inactive: !isActive,
  });

  const onClick = () => {
    if (isActive && userId) {
      setEnabled(!enabled);
    } else {
      onClickTab();
    }
  };

  useEffect(() => {
    if (oldStatus === "offline" && status !== "offline") {
      playSound("UserIn");
    }
    setOldStatus(status);
  }, [status]);

  if (!userId) {
    return (
      <StyledHeader className={className} onClick={onClick}>
        <div className="status-row">
          <img src={`/icons/message.png`} />
          <div className="username">Заметки</div>
        </div>
      </StyledHeader>
    );
  }

  return (
    <StyledHeader className={className} onClick={onClick}>
      <div className="status-row">
        <img className="status" src={statusesDescription[status].picture} />
        {!enabled && customStatus.status && (
          <img src={`statuses_custom/${customStatus.status}.png`} />
        )}
        {customStatus.balloon && <Balloon />}

        <div className="username">{name || "-"}</div>
      </div>
      {enabled && (
        <div className="status-text">
          {customStatus.status && (
            <img src={`statuses_custom/${customStatus.status}.png`} />
          )}
          <div className="status-text__title">{customStatus.title}</div>
          {customStatus.subtitle}
        </div>
      )}
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  position: absolute;
  left: -1px !important;
  right: auto !important;
  top: calc(-${({ theme }) => theme.buttonHeight} - 1px) !important;
  justify-content: start !important;
  padding-left: ${({ theme }) => theme.paddingST}!important;
  padding-right: ${({ theme }) => theme.paddingST}!important;
  background: ${({ theme }) => theme.backgroundColor}!important;
  z-index: 3;
  min-width: 50%;

  .status-row {
    display: flex;
    align-items: center;
    height: ${({ theme }) => theme.buttonHeight};
    gap: ${({ theme }) => theme.paddingSM}!important;
    .username {
      padding-left: ${({ theme }) => theme.paddingSM};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &.enabled {
    width: calc(
      100% - 2 * ${({ theme }) => theme.paddingST} - 2 *
        ${({ theme }) => theme.buttonHeight}
    );
    flex-wrap: wrap;
    height: auto !important;
    border-bottom: ${({ theme }) => theme.borderStyle}!important;
    z-index: 6;
    .status-row {
      width: 100%;
    }
    .status-text {
      display: flex;
      gap: ${({ theme }) => theme.paddingSM}!important;
      padding-top: ${({ theme }) => theme.paddingSM};
      padding-bottom: ${({ theme }) => theme.paddingSM};
      align-items: center;
      flex-wrap: wrap;
      .status-text__title {
        font-weight: bold;
      }
    }
  }

  &.inactive {
    background: linear-gradient(
      ${({ theme }) => theme.backgroundColor} 40%,
      ${({ theme }) => theme.gradientInactiveColor} 55%,
      ${({ theme }) => theme.gradientInactiveColor}
    ) !important;
  }

  &.right {
    right: calc(
      ${({ theme }) => theme.buttonHeight} * 2 + 2px - 1px
    ) !important;
    left: auto !important;
    &.inactive {
      justify-content: flex-end !important;
      .status-row {
        justify-content: flex-end;
      }
    }
  }
`;
