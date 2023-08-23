import { useState } from "react";
import styled from "styled-components";
import { CLickOutside } from "./utils/ClickOutside.jsx";
import classNames from "classnames";

const statuses = [
  "no",
  "angry",
  "duck",
  "zev",
  "dr",
  "pivo",
  "think",
  "hotdog",
  "tv",
  "geys",
  "tea",
  "music",
  "deal",
  "cinema",
  "fun",
  "phone",
  "game",
  "teach",

  "paper",
  "ill",
  "zz",
  "surf",
  "a",
  "kaska",

  "machine",
  "shary",
  "mobile",
  "mobile2",
  "vamp",
  "toilet",

  "question",
  "road",
  "love",
];

const Statuses2 = () => {
  const [visible, setVisible] = useState(false);

  const [baloon, setBaloon] = useState(false);
  const changeBaloon = (e) => {
    setBaloon(e.target.checked);
  };
  const [comment, setComment] = useState("");
  const changeComment = (e) => {
    setComment(e.target.value);
  };

  const [status, setStatus] = useState(0);

  return (
    <StyledStatuses2>
      <button onClick={() => setVisible(true)}>
        {comment && (
          <div className="custom_status">
            <img src={"/comment.png"} />
          </div>
        )}
        <div className="status-2">
          <img src={`/statuses2/${statuses[status]}.png`} />
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
          <input className="input" value={comment} onChange={changeComment} />
          <div className="statuses-2__container">
            {statuses.map((st, i) => {
              const className = classNames({
                "status-2__item": true,
                selected: status === i,
              });
              return (
                <div
                  className={className}
                  key={st}
                  onClick={() => setStatus(i)}
                >
                  <img src={`/statuses2/${st}.png`} />
                </div>
              );
            })}
          </div>
          <label className="balloon">
            <input type="checkbox" value={baloon} onChange={changeBaloon} />
            Шарик дня рождения
          </label>
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
    width: 247px;
    border: 1px solid #9badc4;
    border-radius: 3px;
    padding: 8px 10px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .input {
      width: calc(100% - 9px);
      border: 1px solid #9badc4;
    }

    .statuses-2__container {
      border: 1px solid #9badc4;
      border-radius: 3px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      height: 230px;
      padding: 6px;

      .status-2__item {
        position: relative;
        width: 32px;
        height: 32px;
        overflow: hidden;
        box-sizing: border-box;
        img {
          height: 22px;
          position: absolute;
          left: 4px;
          top: 4px;
        }
        &.selected {
          border: 1px solid #9badc4;
          background-color: #ced9e7;
        }
      }
    }
  }

  .balloon {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  @keyframes baloon_move {
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
      animation-name: baloon_move;
      animation-duration: 0.6s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }
  }
`;
