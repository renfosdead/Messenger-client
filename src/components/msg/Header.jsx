import styled from "styled-components";
import { statuses } from "@/utils/data";
import statusesCustom from "shared/src/custom_statuses";
import Balloon from "@/components/Baloon";
import classnames from "classnames";
import { useState } from "react";

const Header = ({ isActive, onClickTab, right, userId }) => {
  const [enabled, setEnabled] = useState(false);

  const className = classnames({
    button: true,
    enabled,
    "open-tab": !enabled,
    right: right,
    inactive: !isActive,
  });

  const onClick = () => {
    isActive ? setEnabled(!enabled) : onClickTab();
  };

  if (!userId) {
    return (
      <StyledHeader className={className} onClick={onClick}>
        <div className="status-row">
          <img src={`/icons/message.png`} />
          <div className="username">Notes</div>
        </div>
      </StyledHeader>
    );
  }

  return (
    <StyledHeader className={className} onClick={onClick}>
      <div className="status-row">
        <img className="status" src={statuses[0].picture} />
        {!enabled && <img src={`statuses_custom/${statusesCustom[5]}.png`} />}
        <Balloon />

        <div className="username">Username Username</div>
      </div>
      {enabled && (
        <div className="status-text">
          <img src={`statuses_custom/${statusesCustom[5]}.png`} />
          STatus test STatus test STatus test STatus test STatus test STatus
          test STatus test STatus test STatus test STatus test STatus test
          STatus test STatus test STatus test STatus test{" "}
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
    width: calc(100% - 2 * ${({ theme }) => theme.paddingST});
    flex-wrap: wrap;
    height: auto !important;
    border-bottom: ${({ theme }) => theme.borderStyle}!important;
    .status-text {
      display: flex;
      gap: ${({ theme }) => theme.paddingSM}!important;
      padding-top: ${({ theme }) => theme.paddingSM};
      padding-bottom: ${({ theme }) => theme.paddingSM};
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
    right: -1px !important;
    left: auto !important;
    &.inactive {
      justify-content: flex-end !important;
      .status-row {
        justify-content: flex-end;
      }
    }
  }
`;
