import classNames from "classnames";
import { useState } from "react";
import styled from "styled-components";
import { ClickOutside } from "@/utils/ClickOutside";
import ClearCaches from "./ClearCaches";
import Sound from "./Sound";
import Files from "./Files";
import Theme from "./theme/Theme";
import Key from "./Key";
import Info from "./Info";
import History from "./History";

const Settings = ({
  isOpen,
  toggleOpen,
  refresh,
  theme,
  toggleImageViewer,
}) => {
  const className = classNames({
    enabled: isOpen,
    disabled: !isOpen,
    button: true,
  });

  return (
    <StyledSettings>
      <button className={className} onClick={() => toggleOpen(!isOpen)}>
        <img src={"/icons/settings.png"} />
      </button>

      {isOpen && (
        <ClickOutside
          className="dropdown-menu"
          onClickOutside={() => toggleOpen(false)}
        >
          <Sound />
          <Info refresh={refresh} />
          <History />
          <Files
            toggleImageViewer={toggleImageViewer}
            toggleSettings={toggleOpen}
          />
          <Theme {...theme} />
          <Key />
          <ClearCaches />
        </ClickOutside>
      )}
    </StyledSettings>
  );
};

export default Settings;

const StyledSettings = styled.div`
  display: flex;
  align-items: center;
  z-index: 11;
  position: relative;
  > .dropdown-menu {
    position: absolute;
    right: 0;
    top: calc(${({ theme }) => theme.buttonHeight} - 1px);
    background: ${({ theme }) => theme.backgroundColor};
    padding: 0 !important;
    border: none !important;
  }
`;
