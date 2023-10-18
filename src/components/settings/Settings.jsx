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

const Settings = ({ refresh, theme }) => {
  const [enabled, setEnabled] = useState(false);

  const className = classNames({
    enabled: enabled,
    disabled: !enabled,
    button: true,
  });

  return (
    <StyledSettings>
      <button className={className} onClick={() => setEnabled(!enabled)}>
        <img src={"/icons/settings.png"} />
      </button>

      {enabled && (
        <ClickOutside
          className="dropdown-menu"
          onClickOutside={() => setEnabled(false)}
        >
          <Sound />
          <Info refresh={refresh} />
          <History />
          <Files />
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
  z-index: 6;
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
