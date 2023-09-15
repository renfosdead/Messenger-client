import styled from "styled-components";
import { useState } from "react";
import classNames from "classnames";
import EventsApi from "@/api/events";
import store from "@/utils/store";
import EVENT_TYPES from "shared/src/event_types";
import { isOffline } from "../../utils/data";

const Text = ({
  expanded,
  toggleExpanded,
  isKeyboardOpen,
  rows,
  userId,
  chatId,
  refresh,
}) => {
  const [value, setValue] = useState("");

  const onSubmit = async () => {
    if (value) {
      if (userId) {
        if (!isOffline()) {
          const result = await EventsApi.sendMessage(value);
          if (result.data) {
            setValue("");
            refresh();
          }
        }
      } else {
        store.events.set([
          {
            id: `${Math.random()}`,
            type: EVENT_TYPES.sendMessage,
            date: Date.now(),
            userId: "",
            chatId: "notes",
            message: value,
          },
        ]);
        setValue("");
        refresh();
      }
    }
  };
  const className = classNames({
    "styled-text-component": true,
    "with-keyboard": isKeyboardOpen,
  });
  const buttonClassName = classNames({
    button: true,
    simple: true,
  });
  return (
    <StyledText className={className}>
      <div className="text-controls">
        <div>
          <button className="button simple">
            <img src="/icons/smiles.png" />
          </button>

          <button className="button simple">
            <img src="/icons/folder.png" />
          </button>
        </div>

        <button
          className={buttonClassName}
          onClick={() => toggleExpanded(!expanded)}
        >
          {expanded ? (
            <img src="/icons/close.png" />
          ) : (
            <img src="/icons/message.png" />
          )}
        </button>
      </div>
      {expanded && (
        <div className="send-text">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={rows}
          ></textarea>
          <div className="send-btn">
            <button className="button" onClick={onSubmit}>
              <img src="/icons/unread.png" />
              {isKeyboardOpen ? "" : "Отправить"}
            </button>
          </div>
        </div>
      )}
    </StyledText>
  );
};

export default Text;

const StyledText = styled.div`
  position: relative;
  font-size: ${({ theme }) => theme.fontSize};
  border-top: ${({ theme }) => theme.borderStyle};
  background: ${({ theme }) => theme.backgroundColor};
  button {
    font-size: ${({ theme }) => theme.fontSize};
    &.simple {
      border: none !important;
    }
  }
  textarea {
    width: calc(100% - 4 * ${({ theme }) => theme.paddingSM} - 4px);
    resize: none;
    font-size: ${({ theme }) => theme.fontSize}!important;
  }
  .text-controls {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    > div {
      display: flex;
    }
  }
  .send-text {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.paddingST};
  }
  .send-btn {
    display: flex;
    justify-content: flex-end;
    padding: 0;
    button {
      img {
        margin-right: ${({ theme }) => theme.paddingST};
      }
    }
  }

  &.with-keyboard {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    .send-text {
      flex-direction: row;
      gap: 0;
      .send-btn {
        padding: 0;
        button {
          height: auto;
          img {
            margin-right: 0;
          }
        }
      }
    }
  }
`;
