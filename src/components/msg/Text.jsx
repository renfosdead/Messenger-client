import styled from "styled-components";
import { useState } from "react";
import classNames from "classnames";
import UserApi from "@/api/user";

const Text = ({ expanded, toggleExpanded, rows, userId, chatId }) => {
  const [value, setValue] = useState("");

  const onSubmit = async () => {
    const result = await UserApi.sendMessage(value);
    if (result.data) {
      setValue("");
    }
  };

  const className = classNames({
    button: true,
    simple: true,
  });
  return (
    <StyledText className="styled-text-component">
      <div className="text-controls">
        <div>
          <button className="button simple">
            <img src="/icons/smiles.png" />
          </button>

          <button className="button simple">
            <img src="/icons/folder.png" />
          </button>
        </div>

        <button className={className} onClick={() => toggleExpanded(!expanded)}>
          {expanded ? (
            <img src="/icons/close.png" />
          ) : (
            <img src="/icons/message.png" />
          )}
        </button>
      </div>
      {expanded && (
        <>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={rows}
          ></textarea>
          <div className="send-btn">
            <button className="button" onClick={onSubmit}>
              <img src="/icons/unread.png" />
              Отправить
            </button>
          </div>
        </>
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
  .send-btn {
    display: flex;
    justify-content: end;
    padding: ${({ theme }) => theme.paddingST};
    padding-top: 3px;
    button {
      img {
        margin-right: ${({ theme }) => theme.paddingST};
      }
    }
  }
`;
