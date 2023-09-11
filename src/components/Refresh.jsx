import classNames from "classnames";
import styled from "styled-components";

const Refresh = ({ onClick, isLoading, disabled }) => {
  const className = classNames({
    button: true,
    disabled: disabled || isLoading,
  });
  return (
    <StyledRefresh className={className} onClick={onClick}>
      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <img src={"/icons/refresh.png"} />
      )}
    </StyledRefresh>
  );
};

export default Refresh;

const StyledRefresh = styled.button`
  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  .loading {
    width: ${({ theme }) => theme.buttonImageHeight};
    font-size: ${({ theme }) => theme.fontSize};
    color: ${({ theme }) => theme.outColor};
    &:after {
      display: inline-block;
      animation: dotty steps(1, end) 2s infinite;
      content: "";
    }
  }

  @keyframes dotty {
    0% {
      content: ".";
    }
    25% {
      content: "..";
    }
    50% {
      content: "...";
    }
    75% {
      content: "..";
    }
    100% {
      content: ".";
    }
  }
`;
