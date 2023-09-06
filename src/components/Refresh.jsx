import classNames from "classnames";
import styled from "styled-components";

const Refresh = ({ onClick }) => {
  const className = classNames({
    button: true,
  });
  return (
    <StyledRefresh className={className} onClick={onClick}>
      <img src={"/icons/refresh.png"} />
    </StyledRefresh>
  );
};

export default Refresh;

const StyledRefresh = styled.button``;
