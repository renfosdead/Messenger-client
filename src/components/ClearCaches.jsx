import classNames from "classnames";
import { useState } from "react";
import styled from "styled-components";
import store from "@/utils/store";
import { ClickOutside } from "@/utils/ClickOutside";

const ClearCaches = () => {
  const [enabled, setEnabled] = useState(false);

  const className = classNames({
    enabled: enabled,
    disabled: !enabled,
    button: true,
  });

  const getSize = (data) => {
    return data ? (data.length * 16) / (8 * 1024) : 0;
  };

  const evtSize = getSize(localStorage.events);
  const removeEvents = store.events.remove;

  const messagesSize = getSize(localStorage.chat);
  const removeChat = store.chat.remove;

  return (
    <StyledClearCaches>
      <button className={className} onClick={() => setEnabled(!enabled)}>
        <img src={"/icons/settings.png"} />
      </button>

      {enabled && (
        <ClickOutside
          className="dropdown-menu"
          onClickOutside={() => setEnabled(false)}
        >
          <div className="settings_row">
            <div>Events cache</div>
            {evtSize ? evtSize.toFixed(1) + " KB" : "0 KB"}
            {evtSize ? (
              <button className="button" onClick={removeEvents}>
                <img src={"/icons/remove.png"} />
              </button>
            ) : null}
          </div>

          <div className="settings_row">
            <div>Chat history</div>
            {messagesSize ? messagesSize.toFixed(1) + " KB" : "0 KB"}
            {messagesSize ? (
              <button className="button" onClick={removeChat}>
                <img src={"/icons/remove.png"} />
              </button>
            ) : null}
          </div>
        </ClickOutside>
      )}
    </StyledClearCaches>
  );
};

export default ClearCaches;

const StyledClearCaches = styled.div`
  display: flex;
  align-items: center;
  z-index: 6;
  position: relative;
  .dropdown-menu {
    position: absolute;
    width: 300px;
    right: 0;
    top: calc(${({ theme }) => theme.buttonHeight} - 1px);
    background: ${({ theme }) => theme.backgroundColor};
    padding-top: ${({ theme }) => theme.paddingLG}!important;
    padding-bottom: ${({ theme }) => theme.paddingLG}!important;
    .settings_row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      font-size: ${({ theme }) => theme.fontSize};
      padding: ${({ theme }) => theme.paddingSM} 0;
      > div {
        font-weight: bold;
      }
    }
  }
`;
