import styled from "styled-components";

const Balloon = () => {
  return (
    <StyledBalloon>
      <img src="statuses_custom/baloon.png" />
    </StyledBalloon>
  );
};

export default Balloon;

const StyledBalloon = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  margin-right: ${({ theme }) => theme.paddingSM};
  img {
    position: absolute;
    height: 16px !important;
    left: 0;
    top: 0;
    animation-name: balloon_move;
    animation-duration: 0.6s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes balloon_move {
    from {
      left: 0;
      top: 0;
    }
    to {
      left: 1px;
      top: -2px;
    }
  }
`;
