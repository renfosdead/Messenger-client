import styled from "styled-components";
import Statuses from "./Statuses";
import StatusesCustom from "./StatusesCustom";
import { useEvents } from "../hooks/useEvents";
import MessageTabs from "./msg/MessageTabs";
import Refresh from "./Refresh.jsx";
import store from "../utils/store";
import { useState } from "react";
import Settings from "./settings/Settings";
import MainStyles from "@/theme/MainStyles";
import ThemeProvider from "@/theme/ThemeProvider";
import { useTheme } from "@/hooks/useTheme";
import ImagesViewer from "./ImagesViewer";
import { useKeyboard } from "../hooks/useKeyboard.js";
import classNames from "classnames";

function App() {
  const { events, isLoading, loadEvents } = useEvents();

  const status = store.status.get() || "offline";
  const [statusState, setStatusState] = useState(status);

  const [isOpenImageViewer, setIsOpenImageViewer] = useState(false);
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
  const { isKeyboardOpen } = useKeyboard();

  const bottomClassNames = classNames({
    bottom: true,
    "with-keyboard": isKeyboardOpen,
  });

  const theme = useTheme();

  return (
    <>
      <MainStyles />
      <ThemeProvider theme={theme.themeState}>
        <StyledApp>
          <div id="popup-container"></div>
          <div className="top">
            <Refresh
              onClick={loadEvents}
              disabled={statusState === "offline"}
              isLoading={isLoading}
            />
            <Settings
              isOpen={isSettingsExpanded}
              toggleOpen={setIsSettingsExpanded}
              refresh={loadEvents}
              theme={theme}
              toggleImageViewer={setIsOpenImageViewer}
            />
          </div>
          <MessageTabs
            events={events}
            refresh={loadEvents}
            theme={theme.themeState}
          />

          <div className={bottomClassNames}>
            <Statuses
              value={statusState}
              onChange={setStatusState}
              refresh={loadEvents}
            />
            <StatusesCustom refresh={loadEvents} />
          </div>

          <ImagesViewer
            isOpen={isOpenImageViewer}
            toggle={setIsOpenImageViewer}
            events={events}
          />
        </StyledApp>
      </ThemeProvider>
    </>
  );
}

export default App;

const StyledApp = styled.div`
  display: grid;
  grid-template-rows: 1fr ${({ theme }) => theme.buttonHeight};
  height: 100vh;
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};

  #popup-container {
    position: fixed;
    width: 0px;
    height: 0px;
    z-index: 10000;
    color: #000;
  }

  .top {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 6;
    background: transparent;
  }

  .top,
  .bottom {
    display: flex;
    justify-content: space-between;
  }

  .bottom {
    .app-status {
      button {
        border-radius: ${({ theme }) => theme.borderRadius} 0 0
          ${({ theme }) => theme.borderRadius};
      }
    }
    .app-custom-status {
      button {
        border-radius: 0 ${({ theme }) => theme.borderRadius}
          ${({ theme }) => theme.borderRadius} 0;
        border-left: none;
      }
    }
    &.with-keyboard {
      opacity: 0;
    }
  }

  .top-left,
  .top-right {
    display: flex;
    flex-direction: row;
  }

  body {
    font-family: "Nunito";
    font-size: ${({ theme }) => theme.fontSize};
  }

  .button {
    font-family: "Nunito";
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${({ theme }) => theme.buttonHeight};
    border: ${({ theme }) => theme.borderWidth} solid
      ${({ theme }) => theme.borderColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    background: linear-gradient(
      ${({ theme }) => theme.backgroundColor} 40%,
      ${({ theme }) => theme.gradientInactiveColor} 55%,
      ${({ theme }) => theme.gradientInactiveColor}
    );
    color: ${({ theme }) => theme.activeColor};

    &:hover {
      background: linear-gradient(
        ${({ theme }) => theme.backgroundColor},
        ${({ theme }) => theme.gradientActiveColor}
      );
    }
    &:active,
    &.enabled {
      background: ${({ theme }) => theme.gradientActiveColor};
      box-shadow: inset ${({ theme }) => theme.shadowWidth}
        ${({ theme }) => theme.shadowWidth} ${({ theme }) => theme.shadowWidth}
        0 ${({ theme }) => theme.shadowColor};
      color: ${({ theme }) => theme.textColor};
    }
    img {
      height: ${({ theme }) => theme.buttonImageHeight};
    }

    &.simple {
      background: ${({ theme }) => theme.backgroundColor}!important;
    }
    &.open-tab {
      position: absolute;
      right: 0;
      top: 3px;
      border-right: ${({ theme }) => theme.borderWidth} solid
        ${({ theme }) => theme.borderColor}!important;
      border-bottom: 1px solid ${({ theme }) => theme.backgroundColor}!important;
      z-index: 6;
    }
  }

  .flat-btn {
    border: ${({ theme }) => theme.borderWidth} solid
      ${({ theme }) => theme.borderColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    background: ${({ theme }) => theme.gradientActiveColor};
    color: ${({ theme }) => theme.activeColor};
  }

  .close-btn {
    border: none;
    outline: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    color: ${({ theme }) => theme.textColor};
  }

  input,
  textarea {
    font-family: "Nunito";
    outline: none;
    border: ${({ theme }) => theme.borderWidth} solid
      ${({ theme }) => theme.borderColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    font-size: ${({ theme }) => theme.fontSizeSM};
    padding: 0
      calc(
        ${({ theme }) => theme.paddingST} + ${({ theme }) => theme.borderRadius} /
          3
      );
    background: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
  }

  input[type="range"] {
    padding: 0 ${({ theme }) => theme.paddingST};
  }

  label {
    font-family: "Nunito";
    font-size: ${({ theme }) => theme.fontSizeSM};
  }

  .dropdown-menu {
    border: ${({ theme }) => theme.borderWidth} solid
      ${({ theme }) => theme.borderColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: ${({ theme }) => theme.paddingST};
    z-index: 11;
  }

  .img-icon {
    height: ${({ theme }) => theme.buttonImageHeight};
  }
`;
