import { useState } from "react";
import styled from "styled-components";
import { ClickOutside } from "@/utils/ClickOutside.jsx";
import classNames from "classnames";
import { statuses, statusesDescription } from "@/utils/data";
import store from "@/utils/store";
import UserApi from "@/api/user";

const Statuses = () => {
  const [visible, setVisible] = useState(false);

  const status = store.status.get() || "offline";

  const [statusState, setStatusState] = useState(status);
  const changeStatus = (key) => {
    setStatusState(key);
    setVisible(false);
    onChangeStatus(key);
  };

  const className = classNames({
    enabled: visible,
    button: true,
  });

  const loginUser = async (status) => {
    const result = await UserApi.login({
      name: store.name.get() || "Name",
      status,
      customStatus: {},
    });
    if (result?.data) {
      store.userId.set(result?.data?.userId);
      store.chatId.set(result?.data?.chatId);
    }
  };

  const onChangeStatus = async (status) => {
    const statusOld = store.status.get();
    if (store.status.get() !== status) {
      const changeType =
        !statusOld || statusOld === "offline"
          ? "login"
          : status === "offline"
          ? "logout"
          : "change";

      switch (changeType) {
        case "login":
          loginUser(status);
          break;
        case "offline":
          UserApi.logout();
          break;
        default:
          UserApi.changeStatus(status);
      }

      store.status.set(status);
    }
  };

  return (
    <StyledStatuses>
      <button onClick={() => setVisible(true)} className={className}>
        <div className="status-btn">
          <img src={statusesDescription[statusState].picture} />
          {statusesDescription[statusState].title}
        </div>
      </button>
      {visible && (
        <ClickOutside
          className="statuses-container dropdown-menu"
          onClickOutside={() => setVisible(false)}
        >
          {statuses.map((stat, i) =>
            stat.divider ? (
              <div key={`status${i}`} className="divider" />
            ) : (
              <div
                key={`status${i}`}
                className="status"
                onClick={() => changeStatus(stat.key)}
              >
                <img className="img-icon" src={stat.picture} />
                {stat.title}
              </div>
            )
          )}
        </ClickOutside>
      )}
    </StyledStatuses>
  );
};

export default Statuses;

const StyledStatuses = styled.div`
  width: 100%;
  position: relative;
  button {
    width: 100%;
    font-size: 1.2em;
    .status-btn {
      display: flex;
      gap: ${({ theme }) => theme.paddingST};
      align-items: center;
    }
  }

  .statuses-container {
    position: absolute;
    right: 0;
    bottom: ${({ theme }) => theme.buttonHeight};
    width: 220px;
    background: ${({ theme }) => theme.backgroundColor};
    padding-top: ${({ theme }) => theme.paddingSM}!important;
    padding-bottom: ${({ theme }) => theme.paddingSM}!important;
    z-index: 5;
    .divider {
      background: ${({ theme }) => theme.borderColor};
      height: 1px;
      width: 100%;
      margin: 4px 0;
    }

    .status {
      display: flex;
      align-items: center;
      line-height: calc(${({ theme }) => theme.fontSize} * 1.7);
      font-size: 1.2em;

      img {
        margin-right: ${({ theme }) => theme.paddingST};
      }
    }
  }
`;
