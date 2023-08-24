import { useState } from "react";
import styled from "styled-components";
import { ClickOutside } from "@/utils/ClickOutside.jsx";
import classNames from "classnames";
import { statusesCustom } from "@/utils/data";
import Balloon from "./Baloon";

const CustomStatuses = () => {
  const [visible, setVisible] = useState(false);

  const [balloon, setBalloon] = useState(false);
  const changeBaloon = (e) => {
    setBalloon(e.target.checked);
  };
  const [comment, setComment] = useState("");
  const changeComment = (e) => {
    setComment(e.target.value);
  };

  const [status, setStatus] = useState(0);

  const className = classNames({
    enabled: visible,
    button: true,
  });

  return (
    <StyledCustomStatuses>
      <button onClick={() => setVisible(true)} className={className}>
        {comment && (
          <div className="custom-status-btn__comment">
            <img src={"/statuses_custom/comment.png"} />
          </div>
        )}
        <div className="custom-status-btn__picture">
          <img src={`/statuses_custom/${statusesCustom[status]}.png`} />
        </div>
        {balloon && <Balloon />}
      </button>

      {visible && (
        <ClickOutside
          className="custom-status-submenu dropdown-menu"
          onClickOutside={() => setVisible(false)}
        >
          <input
            className="custom-status-submenu__input"
            value={comment}
            onChange={changeComment}
          />
          <div className="custom-status-submenu__container dropdown-menu">
            {statusesCustom.map((st, i) => {
              const className = classNames({
                "custom-status-submenu__item": true,
                selected: status === i,
              });
              return (
                <div
                  className={className}
                  key={st}
                  onClick={() => setStatus(i)}
                >
                  <img src={`/statuses_custom/${st}.png`} />
                </div>
              );
            })}
          </div>
          <label className="custom-status-submenu__balloon-checkbox">
            <input type="checkbox" checked={balloon} onChange={changeBaloon} />
            Шарик дня рождения
          </label>
        </ClickOutside>
      )}
    </StyledCustomStatuses>
  );
};

export default CustomStatuses;

const StyledCustomStatuses = styled.div`
  position: relative;
  .custom-status-btn__comment {
    width: calc(${({ theme }) => theme.buttonImageHeight} - 10px);
    img {
      position: absolute;
      top: 4px;
      left: 4px;
      width: calc(${({ theme }) => theme.buttonImageHeight} - 10px);
      height: calc(${({ theme }) => theme.buttonImageHeight} - 10px);
      z-index: 1;
    }
  }
  .custom-status-btn__picture {
    position: relative;
    overflow: hidden;
    width: ${({ theme }) => theme.buttonImageHeight};
    height: ${({ theme }) => theme.buttonImageHeight};
    img {
      position: absolute;
      z-index: 0;
      left: 0;
      height: ${({ theme }) => theme.buttonImageHeight};
    }
  }

  .custom-status-submenu {
    position: absolute;
    right: 0;
    bottom: ${({ theme }) => theme.buttonHeight};
    width: 240px;
    background: ${({ theme }) => theme.backgroundColor};
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.paddingST};

    .custom-status-submenu__input {
      border: fontSizeSM;
    }

    .custom-status-submenu__balloon-checkbox {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.paddingSM};
      font-size: ${({ theme }) => theme.fontSizeSM};
    }

    .custom-status-submenu__container {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      height: 230px;

      .custom-status-submenu__item {
        position: relative;
        width: 32px;
        height: 32px;
        overflow: hidden;
        box-sizing: border-box;
        img {
          height: ${({ theme }) => theme.buttonImageHeight};
          position: absolute;
          left: 4px;
          top: 4px;
        }
        &.selected {
          border: ${({ theme }) => theme.borderStyle};
          background-color: ${({ theme }) => theme.gradientInactiveColor};
        }
      }
    }
  }
`;
