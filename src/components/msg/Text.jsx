import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import EventsApi from "@/api/events";
import store from "@/utils/store";
import EVENT_TYPES from "shared/src/event_types";
import {
  QUOTE_STRING,
  getQuote,
  getValueWithoutQuote,
  isOffline,
} from "../../utils/data";
import { useSounds } from "../../hooks/useSounds";
import Quote from "./Quote";

const Text = ({
  expanded,
  toggleExpanded,
  isKeyboardOpen,
  rows,
  userId,
  chatId,
  refresh,
  value = "",
  setValue,
}) => {
  const textAreaRef = useRef();
  const { playSound } = useSounds();

  const onSubmit = async () => {
    if (value) {
      if (userId) {
        if (!isOffline()) {
          const result = await EventsApi.sendMessage(value);
          if (result.data) {
            playSound("SendMsg");
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
            body: { message: value },
          },
        ]);
        playSound("SendMsg");
        setValue("");
        refresh();
      }
    }
  };

  const className = classNames({
    "styled-text-component": true,
    "with-keyboard": isKeyboardOpen && expanded,
  });

  const buttonClassName = classNames({
    button: true,
    simple: true,
  });

  useEffect(() => {
    if (expanded) {
      textAreaRef.current.focus();
      textAreaRef.current.selectionStart = value.length;
      textAreaRef.current.selectionEnd = value.length;
    }
  }, [expanded]);

  const onChange = (e) => {
    const payload = quote
      ? `${QUOTE_STRING}${quote}${QUOTE_STRING}${e.target.value}`
      : e.target.value;
    setValue(payload);
  };

  const quote = getQuote(value);
  const parsedValue = getValueWithoutQuote(quote, value);
  const removeQuote = () => {
    setValue(parsedValue);
  };

  return (
    <StyledText className={className}>
      {quote && expanded ? (
        <div className="quote-container">
          <Quote text={quote} />
          <button className="close-btn" onClick={removeQuote}>
            <div>X</div>
          </button>
        </div>
      ) : null}
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
            ref={textAreaRef}
            value={parsedValue}
            onChange={onChange}
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
  border-top: ${({ theme }) => theme.borderWidth} solid
    ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.backgroundColor};
  button {
    font-size: ${({ theme }) => theme.fontSize};
    &.simple {
      border: none !important;
    }
  }
  textarea {
    width: calc(
      100% - 2 * ${({ theme }) => theme.paddingST} - 2 *
        ${({ theme }) => theme.borderWidth}
    );
    resize: none;
    font-size: ${({ theme }) => theme.fontSize}!important;
    line-height: 1.5;
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
      color: ${({ theme }) => theme.activeColor};
      img {
        margin-right: ${({ theme }) => theme.paddingST};
      }
    }
  }

  .quote-container {
    position: absolute;
    left: 0;
    right: 0;
    bottom: calc(
      ${4} * ${({ theme }) => theme.fontSize} + 2 *
        ${({ theme }) => theme.buttonHeight} + 8 *
        ${({ theme }) => theme.paddingSM} + 3 *
        ${({ theme }) => theme.paddingST} + 7 *
        ${({ theme }) => theme.borderWidth}
    );
    border-top: ${({ theme }) => theme.borderWidth} solid
      ${({ theme }) => theme.borderColor};
    background-color: ${({ theme }) => theme.backgroundColor};

    .text-quote {
      padding: ${({ theme }) => theme.paddingST};
      padding-right: ${({ theme }) => theme.buttonHeight};
    }

    .close-btn {
      position: absolute;
      right: ${({ theme }) => theme.paddingST};
      top: ${({ theme }) => theme.paddingST};
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

    .quote-container {
      bottom: calc(
        ${4} * ${({ theme }) => theme.fontSize} + 2 *
          ${({ theme }) => theme.paddingLG} + 4 *
          ${({ theme }) => theme.borderWidth} +
          ${({ theme }) => theme.paddingSM}
      );
    }
  }
`;
