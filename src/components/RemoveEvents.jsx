import classNames from "classnames";
import styled from "styled-components";

const RemoveEvents = ({ onClick }) => {
  const className = classNames({
    button: true,
  });

  const getEventsSize = () => {
    const events = localStorage.events;
    return events ? (events.length * 16) / (8 * 1024) : 0;
  };

  const evtSize = getEventsSize();

  return (
    <StyledRemoveEvents>
      {evtSize ? evtSize.toFixed(1) + " KB" : ""}
      <button className={className} onClick={onClick}>
        <img src={"/icons/remove.png"} />
      </button>
    </StyledRemoveEvents>
  );
};

export default RemoveEvents;

const StyledRemoveEvents = styled.div`
  display: flex;
  align-items: center;
`;
