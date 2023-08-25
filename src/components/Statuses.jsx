import { useState } from "react";
import styled from "styled-components";
import { ClickOutside } from "@/utils/ClickOutside.jsx";
import classNames from "classnames";
import { statuses } from "../utils/data";

const Statuses = () => {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState(0);
  const changeStatus = (i) => {
    setStatus(i);
    setVisible(false);
  };

  const className = classNames({
    enabled: visible,
    button: true,
  });

  return (
    <StyledStatuses>
      <button onClick={() => setVisible(true)} className={className}>
        <div className="status-btn">
          <img src={statuses[status].picture} />
          {statuses[status].title}
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
                <img className="img-icon" src={stat.picture} />
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
        margin-right: ${({ theme }) => theme.paddingST};
      }
    }
  }
`;
