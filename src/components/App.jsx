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

import store from "@/utils/store";
import UserApi from "@/api/user";

function App() {
  const { events } = useEvents();

  const onChangeStatus = async (status) => {
    const statusOld = store.status.get();
    if (store.status.get() !== status) {
      if (!statusOld || statusOld === "offline") {
        const result = await UserApi.login({
          name: store.name.get() || "Name",
          status,
          customStatus: {},
        });
        if (result?.data) {
          store.userId.set(result?.data?.userId);
          store.chatId.set(result?.data?.chatId);
        }
      }

      if (status === "offline") {
        await UserApi.logout();
      }

      store.status.set(status);
    }
  };

  return (
    <StyledApp>
      <div className="top">
        <div className="top-left">
          <Sound />
          <History />
          <Files />
          <Theme />
          <Key />
          <Info />
        </div>
        <Refresh />
      </div>
      <MessageTabs />

      <div className="bottom">
        <Statuses onChangeStatus={onChangeStatus} />
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
  .top,
  .bottom {
    display: flex;
    justify-content: space-between;
  }

  .top-left {
    display: flex;
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
  }

  .img-icon {
    height: ${({ theme }) => theme.buttonImageHeight};
  }
`;
