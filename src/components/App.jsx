import styled from "styled-components";
import Statuses from "./Statuses";
import StatusesCustom from "./StatusesCustom";
import { useEvents } from "../hooks/useEvents";
import MessageTabs from "./msg/MessageTabs";
import Refresh from "./Refresh.jsx";
import store from "../utils/store";
import { useState } from "react";
import Settings from "./settings/Settings";

function App() {
  const { events, isLoading, loadEvents } = useEvents();

  const status = store.status.get() || "offline";
  const [statusState, setStatusState] = useState(status);

  return (
    <StyledApp>
      <div id="popup-container"></div>
      <div className="top">
        <Refresh
          onClick={loadEvents}
          disabled={statusState === "offline"}
          isLoading={isLoading}
        />
        <Settings refresh={loadEvents} />
      </div>
      <MessageTabs events={events} refresh={loadEvents} />

      <div className="bottom">
        <Statuses
          value={statusState}
          onChange={setStatusState}
          refresh={loadEvents}
        />
        <StatusesCustom refresh={loadEvents} />
      </div>
    </StyledApp>
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
    z-index: 15;
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
      z-index: 3;
    }
  }

  .flat-btn {
    border: ${({ theme }) => theme.borderWidth} solid
      ${({ theme }) => theme.borderColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    background: ${({ theme }) => theme.gradientActiveColor};
    color: ${({ theme }) => theme.activeColor};
  }

  input,
  textarea {
    font-family: "Nunito";
    outline: none;
    border: ${({ theme }) => theme.borderWidth} solid
      ${({ theme }) => theme.borderColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    font-size: ${({ theme }) => theme.fontSizeSM};
    padding: 0 ${({ theme }) => theme.paddingST};
    background: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
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
    z-index: 6;
  }

  .img-icon {
    height: ${({ theme }) => theme.buttonImageHeight};
  }

  .checkbox {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  .checkbox + label {
    display: inline-flex;
    align-items: center;
    user-select: none;

    &:before {
      content: "";
      display: inline-block;
      width: ${({ theme }) => theme.fontSizeSM};
      height: ${({ theme }) => theme.fontSizeSM};
      flex-shrink: 0;
      flex-grow: 0;
      border: ${({ theme }) => theme.borderWidth} solid
        ${({ theme }) => theme.borderColor};
      border-radius: ${({ theme }) => theme.borderRadius};
      margin-right: ${({ theme }) => theme.paddingST};
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 50% 50%;
    }
  }

  .checkbox:not(:disabled):not(:checked) + label:hover::before {
    border-color: ${({ theme }) => theme.borderColor};
  }

  .checkbox:not(:disabled):active + label::before {
    background-color: ${({ theme }) => theme.backgroundColor};
    border-color: ${({ theme }) => theme.borderColor};
  }

  .checkbox:focus:not(:checked) + label::before {
    border-color: ${({ theme }) => theme.borderColor};
  }

  .checkbox:checked + label::before {
    border-color: ${({ theme }) => theme.borderColor};
    background-color: ${({ theme }) => theme.backgroundColor};
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }
`;
