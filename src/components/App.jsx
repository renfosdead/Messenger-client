import styled from "styled-components";
import Statuses from "./Statuses";
import StatusesCustom from "./StatusesCustom";
import Sound from "./Sound";
import History from "./History";
import Files from "./Files";
import Key from "./Key";
import Theme from "./Theme";
import Info from "./Info";
import { useEvents } from "../hooks/useEvents";
import MessageTabs from "./msg/MessageTabs";
import Refresh from "./Refresh.jsx";
import store from "../utils/store";
import ClearCaches from "./ClearCaches";
import { useState } from "react";

function App() {
  const { events, isLoading, loadEvents } = useEvents();

  const status = store.status.get() || "offline";
  const [statusState, setStatusState] = useState(status);

  return (
    <StyledApp>
      <div id="popup-container"></div>
      <div className="top">
        <div className="top-left">
          <Sound />
          <History />
          <Files />
          <Theme />
          <Key />
          <Info />
        </div>
        <div className="top-right">
          <ClearCaches />{" "}
          <Refresh
            onClick={loadEvents}
            disabled={statusState === "offline"}
            isLoading={isLoading}
          />
        </div>
      </div>
      <MessageTabs events={events} refresh={loadEvents} />

      <div className="bottom">
        <Statuses value={statusState} onChange={setStatusState} />
        <StatusesCustom />
      </div>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  display: grid;
  grid-template-rows: ${({ theme }) => theme.buttonHeight} 1fr ${({ theme }) =>
      theme.buttonHeight};
  height: 100vh;

  #popup-container {
    position: fixed;
    width: 0px;
    height: 0px;
    z-index: 15;
  }

  .top,
  .bottom {
    display: flex;
    justify-content: space-between;
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
    border: ${({ theme }) => theme.borderStyle};
    border-radius: ${({ theme }) => theme.borderRadius};
    background: linear-gradient(
      ${({ theme }) => theme.backgroundColor} 40%,
      ${({ theme }) => theme.gradientInactiveColor} 55%,
      ${({ theme }) => theme.gradientInactiveColor}
    );
    &:hover {
      background: linear-gradient(
        ${({ theme }) => theme.backgroundColor},
        ${({ theme }) => theme.gradientActiveColor}
      );
    }
    &:active,
    &.enabled {
      background: ${({ theme }) => theme.gradientActiveColor};
      box-shadow: ${({ theme }) => theme.innerBoxShadow};
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
      border-right: ${({ theme }) => theme.borderStyle}!important;
      border-bottom: 1px solid ${({ theme }) => theme.backgroundColor}!important;
      z-index: 3;
    }
  }

  input,
  textarea {
    font-family: "Nunito";
    outline: none;
    border: ${({ theme }) => theme.borderStyle};
    border-radius: ${({ theme }) => theme.borderRadius};
    font-size: ${({ theme }) => theme.fontSizeSM};
    padding: 0 ${({ theme }) => theme.paddingST};
  }

  label {
    font-family: "Nunito";
    font-size: ${({ theme }) => theme.fontSizeSM};
  }

  .dropdown-menu {
    border: ${({ theme }) => theme.borderStyle};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: ${({ theme }) => theme.paddingST};
    z-index: 6;
  }

  .img-icon {
    height: ${({ theme }) => theme.buttonImageHeight};
  }
`;
