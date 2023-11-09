import { useState } from "react";
import styled from "styled-components";
import { ClickOutside } from "@/utils/ClickOutside.jsx";
import classNames from "classnames";
import statusesCustom from "shared/src/custom_statuses";
import Balloon from "./Baloon";
import UserApi from "@/api/user";
import store from "@/utils/store";
import { isOffline } from "../utils/data";
import { useKeyboard } from "../hooks/useKeyboard";

const CustomStatuses = ({ refresh }) => {
  const { isKeyboardOpen } = useKeyboard();

  const [visible, setVisible] = useState(false);

  const statusCustom = store.customStatus.get() || {
    status: undefined,
    balloon: false,
    title: "",
    subtitle: "",
  };

  const [balloon, setBalloon] = useState(statusCustom.balloon);
  const changeBaloon = (e) => {
    setBalloon(e.target.checked);
  };
  const [comment, setComment] = useState(statusCustom.title);
  const changeComment = (e) => {
    setComment(e.target.value);
  };
  const [additionalComment, setAdditionalComment] = useState(
    statusCustom.subtitle
  );
  const changeAdditionalComment = (e) => {
    setAdditionalComment(e.target.value);
  };

  const [status, setStatus] = useState(statusCustom.status);

  const className = classNames({
    enabled: visible,
    button: true,
    "status-toggler-btn": true,
  });

  const containerClassName = classNames({
    "custom-status-submenu": true,
    "dropdown-menu": true,
    "with-keyboard": isKeyboardOpen,
  });

  const onSubmit = async () => {
    const customStatus = {
      status: status || undefined,
      balloon,
      title: comment,
      subtitle: additionalComment,
    };

    if (isOffline()) {
      store.customStatus.set(customStatus);
      setVisible(false);
    } else {
      const result = await UserApi.changeCustomStatus(customStatus);
      if (result?.data) {
        store.customStatus.set(customStatus);
        setVisible(false);
        refresh();
      }
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
          <img src={`/statuses_custom/${status || "no_status"}.png`} />
        </div>
        {balloon && <Balloon />}
      </button>

      {visible && (
        <ClickOutside
          className={containerClassName}
          onClickOutside={() => setVisible(false)}
        >
          <div className="custom-status__comment">
            <img
              className="img-icon"
              src={`/statuses_custom/${status || "no_status"}.png`}
            />
            <input
              className="custom-status-submenu__input"
              value={comment}
              onChange={changeComment}
              disabled={!status}
            />
          </div>
          <input
            className="custom-status-submenu__input"
            value={additionalComment}
            onChange={changeAdditionalComment}
            disabled={!status}
          />
          <div className="custom-status-submenu__container dropdown-menu">
            {statusesCustom.map((st, i) => {
              const className = classNames({
                "custom-status-submenu__item": true,
                selected: status === st,
              });
              return (
                <div
                  className={className}
                  key={st}
                  onClick={() => setStatus(st || undefined)}
                >
                  <img
                    className="img-icon"
                    src={`/statuses_custom/${st}.png`}
                  />
                </div>
              );
            })}
          </div>
          <div className="custom-status-submenu__balloon-checkbox">
            {balloon && <Balloon />}
            <div>
              <input
                className="checkbox"
                type="checkbox"
                id="ball"
                name="ball"
                checked={balloon}
                onChange={changeBaloon}
              />
              <label htmlFor="ball"> Шарик дня рождения</label>
            </div>
          </div>
          <div className="custom-statuses__confirm">
            <button className="flat-btn" onClick={onSubmit}>
              ОК
            </button>
            <button className="flat-btn" onClick={() => setVisible(false)}>
              Отмена
            </button>
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
      top: calc(3px + ${({ theme }) => theme.borderWidth});
      left: calc(3px + ${({ theme }) => theme.borderWidth});
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
    width: calc(
      7 *
        (
          ${({ theme }) => theme.buttonImageHeight} + 2 *
            ${({ theme }) => theme.borderWidth} + 2 *
            ${({ theme }) => theme.paddingSM}
        ) + 4 * ${({ theme }) => theme.borderWidth}
    );
    background: ${({ theme }) => theme.backgroundColor};
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.paddingST};
    z-index: 5;
    &.with-keyboard {
      bottom: 0;
    }

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
      height: 222px;
      gap: ${({ theme }) => theme.paddingSM};
      .custom-status-submenu__item {
        position: relative;
        width: calc(
          ${({ theme }) => theme.buttonImageHeight} + 2 *
            ${({ theme }) => theme.borderWidth} +
            ${({ theme }) => theme.paddingSM}
        );
        height: calc(
          ${({ theme }) => theme.buttonImageHeight} + 2 *
            ${({ theme }) => theme.borderWidth} +
            ${({ theme }) => theme.paddingSM}
        );
        overflow: hidden;
        box-sizing: border-box;
        padding: ${({ theme }) => theme.paddingSM};

        img {
          position: absolute;
          left: calc(
            ${({ theme }) => theme.borderWidth} +
              ${({ theme }) => theme.paddingSM}
          );
          top: calc(
            ${({ theme }) => theme.borderWidth} +
              ${({ theme }) => theme.paddingSM}
          );
        }
        &.selected {
          border: ${({ theme }) => theme.borderWidth} solid
            ${({ theme }) => theme.borderColor};
          border-radius: ${({ theme }) => theme.borderRadius};
          background-color: ${({ theme }) => theme.gradientInactiveColor};
          img {
            left: ${({ theme }) => theme.paddingSM};
            top: ${({ theme }) => theme.paddingSM};
          }
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
