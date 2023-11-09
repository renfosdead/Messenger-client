import styled from "styled-components";

const Loading = () => {
  return <StyledLoading className="loading"></StyledLoading>;
};

export default Loading;

const StyledLoading = styled.div`
  width: ${({ theme }) => theme.buttonImageHeight};
  font-size: ${({ theme }) => theme.fontSize};
  color: ${({ theme }) => theme.outColor};
  &:after {
    display: inline-block;
    animation: dotty steps(1, end) 2s infinite;
    content: "";
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
