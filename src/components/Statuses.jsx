import { useState } from "react";
import styled from "styled-components";
import { ClickOutside } from "@/utils/ClickOutside.jsx";

const statuses = [
  {
    title: "Готов общаться",
    picture: "statuses/free_for_chat.png",
  },
  {
    title: "Злой",
    picture: "statuses/evil.png",
  },
  {
    title: "Депрессия",
    picture: "statuses/depression.png",
  },
  {
    title: "Дома",
    picture: "statuses/home.png",
  },
  {
    title: "На работе",
    picture: "statuses/work.png",
  },
  { divider: true },

  {
    title: "Кушаю",
    picture: "statuses/lunch.png",
  },
  {
    title: "Отошел",
    picture: "statuses/away.png",
  },
  {
    title: "Недоступен",
    picture: "statuses/not_available.png",
  },
  {
    title: "Занят",
    picture: "statuses/occupied.png",
  },
  {
    title: "Не беспокоить",
    picture: "statuses/do_not_disturb.png",
  },
  { divider: true },

  {
    title: "В сети",
    picture: "statuses/online.png",
  },
  {
    title: "Невидимый",
    picture: "statuses/invisible.png",
  },
  {
    title: "Невидим для всех",
    picture: "statuses/invisible_all.png",
  },
  { divider: true },
  {
    title: "Не в сети",
    picture: "statuses/offline.png",
  },
];

const Statuses = () => {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState(statuses[0]);
  const changeStatus = (i) => {
    setStatus(statuses[i]);
    setVisible(false);
  };
  return (
    <StyledStatuses>
      <button onClick={() => setVisible(true)}>
        <div className="status-btn">
          <img src={status.picture} />
          {status.title}
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
                onClick={() => changeStatus(i)}
              >
                <img src={stat.picture} />
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
    width: 200px;
    background: ${({ theme }) => theme.backgroundColor};
    padding-top: ${({ theme }) => theme.paddingSM}!important;
    padding-bottom: ${({ theme }) => theme.paddingSM}!important;
    .divider {
      background: ${({ theme }) => theme.borderColor};
      height: 1px;
      width: 100%;
      margin: 4px 0;
    }

    .status {
      display: flex;
      align-items: center;
      line-height: 1.5;
      font-size: 1.2em;

      img {
        width: ${({ theme }) => theme.buttonImageHeight};
        height: ${({ theme }) => theme.buttonImageHeight};
        margin-right: ${({ theme }) => theme.paddingST};
      }
    }
  }
`;
