import { useState } from "react";
import styled from "styled-components";
import { CLickOutside } from "./utils/ClickOutside.jsx";

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
        <div className="status">
          <img src={status.picture} />
          {status.title}
        </div>
      </button>
      {visible && (
        <CLickOutside
          className="statuses"
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
        </CLickOutside>
      )}
    </StyledStatuses>
  );
};

export default Statuses;

const StyledStatuses = styled.div`
  width: 100%;
  position: relative;
  button {
    .status {
      display: flex;
      align-items: center;
      font-size: 16px;
      justify-content: center;
    }
  }
  .statuses {
    position: absolute;
    right: 0;
    top: 20px;
    width: 200px;
    border: 1px solid #9badc4;
    border-radius: 3px;
    padding: 5px 10px;
    background: #ffffff;
    .divider {
      background: #5c728d;
      height: 1px;
      width: 100%;
      margin: 4px 0;
    }
  }

  .status {
    display: flex;
    font-size: 16px;
    align-items: center;
    line-height: 1.5;
    font-size: 1.2rem;
    img {
      width: 22px;
      height: 22px;
      margin-right: 8px;
    }
  }
`;
