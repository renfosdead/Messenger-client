import { useState } from "react";
import styled from "styled-components";
import { ClickOutside } from "@/utils/ClickOutside.jsx";
import classNames from "classnames";
import statusesCustom from "shared/src/custom_statuses";
import Balloon from "./Baloon";
import UserApi from "@/api/user";
import store from "@/utils/store";

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
  const [additionalComment, setAdditionalComment] = useState("");
  const changeAdditionalComment = (e) => {
    setAdditionalComment(e.target.value);
  };

  const [status, setStatus] = useState(-1);

  const className = classNames({
    enabled: visible,
    button: true,
    "status-toggler-btn": true,
  });

  const onSubmit = async () => {
    const customStatus = {
      status: status !== -1 ? statusesCustom[status] : undefined,
      balloon,
      title: comment,
      subtitle: additionalComment,
    };
    const result = await UserApi.changeCustomStatus(customStatus);
    if (result?.data) {
      store.customStatus.set(customStatus);
      setVisible(false);
    }
  };

  return (
    <StyledCustomStatuses>
      <button onClick={() => setVisible(true)} className={className}>
        {comment && (
          <div className="custom-status-btn__comment">
            <img src={"/statuses_custom/comment.png"} />
          </div>
        )}
        <div className="custom-status-btn__picture">
          <img
            src={`/statuses_custom/${
              statusesCustom[status] || "no_status"
            }.png`}
          />
        </div>
        {balloon && <Balloon />}
      </button>

      {visible && (
        <ClickOutside
          className="custom-status-submenu dropdown-menu"
          onClickOutside={() => setVisible(false)}
        >
          <div className="custom-status__comment">
            <img
              className="img-icon"
              src={`/statuses_custom/${
                statusesCustom[status] || "no_status"
              }.png`}
            />
            <input
              className="custom-status-submenu__input"
              value={comment}
              onChange={changeComment}
              disabled={status === -1}
            />
          </div>
          <input
            className="custom-status-submenu__input"
            value={additionalComment}
            onChange={changeAdditionalComment}
            disabled={status === -1}
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
                  onClick={() => setStatus(i || -1)}
                >
                  <img
                    className="img-icon"
                    src={`/statuses_custom/${st}.png`}
                  />
                </div>
              );
            })}
          </div>
          <label className="custom-status-submenu__balloon-checkbox">
            {balloon && <Balloon />}
            <input type="checkbox" checked={balloon} onChange={changeBaloon} />
            Шарик дня рождения
          </label>
          <div className="custom-statuses__confirm">
            <button onClick={onSubmit}>ОК</button>
            <button onClick={() => setVisible(false)}>Отмена</button>
          </div>
        </ClickOutside>
      )}
    </StyledCustomStatuses>
  );
};

export default CustomStatuses;

const StyledCustomStatuses = styled.div`
  position: relative;
  .custom-status-btn__comment {
    width: calc(${({ theme }) => theme.buttonImageHeight} / 2);
    img {
      position: absolute;
      top: 4px;
      left: 4px;
      width: calc(${({ theme }) => theme.buttonImageHeight} / 2);
      height: calc(${({ theme }) => theme.buttonImageHeight} / 2) !important;
      z-index: 1;
    }
  }

  .status-toggler-btn {
    > div {
      display: flex;
      align-items: center;
    }
  }

  .custom-status-submenu {
    position: absolute;
    right: 0;
    bottom: ${({ theme }) => theme.buttonHeight};
    width: 260px;
    background: ${({ theme }) => theme.backgroundColor};
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.paddingST};
    z-index: 5;

    .custom-status-submenu__balloon-checkbox {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.paddingSM};
      font-size: ${({ theme }) => theme.fontSize};
    }

    .custom-status-submenu__container {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      height: 230px;

      .custom-status-submenu__item {
        position: relative;
        width: calc(${({ theme }) => theme.buttonImageHeight} + 10px);
        height: calc(${({ theme }) => theme.buttonImageHeight} + 10px);
        overflow: hidden;
        box-sizing: border-box;
        img {
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

    .custom-statuses__confirm {
      display: flex;
      gap: ${({ theme }) => theme.paddingST};
      button {
        width: 100%;
      }
    }
  }

  button {
    font-size: ${({ theme }) => theme.fontSize};
    &.simple {
      border: none !important;
    }
  }

  .custom-status__comment {
    display: flex;
    gap: ${({ theme }) => theme.paddingST};
    input {
      width: calc(100% - ${({ theme }) => theme.paddingST});
    }
  }
`;
