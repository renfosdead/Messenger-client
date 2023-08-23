import { useState } from "react";
import styled from "styled-components";
import { CLickOutside } from "./utils/ClickOutside.jsx";

const statuses = [
  {
    title: "Готов общаться",
    picture: "statuses/free_for_chat.png",
  },
];

const Statuses2 = () => {
  const [visible, setVisible] = useState(false);

  const [baloon, setBaloon] = useState(true);
  const [comment, setComment] = useState(true);

  const [status, setStatus] = useState(statuses[0]);

  const changeStatus = (i) => {
    setStatus(statuses[i]);
    setVisible(false);
  };
  return (
    <StyledStatuses2>
      <button onClick={() => setVisible(true)}>
        {comment && (
          <div className="custom_status">
            <img src={"/comment.png"} />
          </div>
        )}
        <div className="status-2">
          <img src={"/statuses_2.png"} />
        </div>
        {baloon && (
          <div className="status-2-ball">
            <img src={"/baloon.png"} />
          </div>
        )}
      </button>
      {visible && (
        <CLickOutside
          className="statuses-2"
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
    </StyledStatuses2>
  );
};

export default Statuses2;

const StyledStatuses2 = styled.div`
  button {
    display: flex;
    align-items: center;
  }
  position: relative;
  .custom_status {
    width: 12px;
    img {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 12px;
      height: 12px;
      z-index: 1;
    }
  }
  .status-2 {
    position: relative;
    overflow: hidden;
    width: 22px;
    height: 22px;
    img {
      position: absolute;
      z-index: 0;
      left: 0;
      height: 22px;
    }
  }

  .statuses-2 {
    position: absolute;
    right: 0;
    top: 20px;
    width: 200px;
    border: 1px solid #9badc4;
    border-radius: 3px;
    padding: 5px 10px;
    background: #ffffff;
  }

  @keyframes example {
    from {
      left: 0;
      top: 0;
    }
    to {
      left: 1px;
      top: -2px;
    }
  }
  .status-2-ball {
    position: relative;
    width: 10px;
    height: 15px;
    img {
      position: absolute;
      left: 0;
      top: 0;
      animation-name: example;
      animation-duration: 0.6s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }
  }
`;
