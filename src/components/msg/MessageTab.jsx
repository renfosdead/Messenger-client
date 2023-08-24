import styled from "styled-components";
import Header from "./Header";
import Text from "./Text";

const MessageTab = () => {
  return (
    <StyledMessageTab>
      <Header />
    </StyledMessageTab>
  );
};

export default MessageTab;

const StyledMessageTab = styled.div`
  position: relative;
  height: calc(100vh - 2 * ${({ theme }) => theme.buttonHeight});
  border: ${({ theme }) => theme.borderStyle};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${({ theme }) => theme.fontSize};
`;
