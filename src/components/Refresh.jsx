import classNames from "classnames";
import styled from "styled-components";
import Loading from "./Loading";

const Refresh = ({ onClick, isLoading, disabled }) => {
  const className = classNames({
    button: true,
    disabled: disabled || isLoading,
  });
  return (
    <StyledRefresh className={className} onClick={onClick}>
      {isLoading ? <Loading /> : <img src={"/icons/refresh.png"} />}
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
