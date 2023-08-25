import styled from "styled-components";
import { useState } from "react";
import classNames from "classnames";

const Text = ({ expanded, toggleExpanded }) => {
  const [value, setValue] = useState("");

  const className = classNames({
    button: true,
    simple: true,
  });
  return (
    <StyledText>
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
            rows={12}
          ></textarea>
          <div className="send-btn">
            <button className="button">
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
