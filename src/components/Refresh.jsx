import classNames from "classnames";
import styled from "styled-components";

const Refresh = ({ onClick, disabled }) => {
  const className = classNames({
    button: true,
    disabled,
  });
  return (
    <StyledRefresh className={className} onClick={onClick}>
      <img src={"/icons/refresh.png"} />
    </StyledRefresh>
  );
};

export default Refresh;

const StyledRefresh = styled.button`
  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;
