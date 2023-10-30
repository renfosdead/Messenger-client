import styled from "styled-components";

const Quote = ({ text }) => {
  return (
    <StyledQuote className="text-quote">
      <div>{text}</div>
    </StyledQuote>
  );
};

export default Quote;

const StyledQuote = styled.div`
  padding: 0 ${({ theme }) => theme.paddingST} ${({ theme }) => theme.paddingST}
    0;
  padding-left: 0;
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
  white-space: break-spaces;
  word-break: break-word;

  > div {
    padding-left: ${({ theme }) => theme.paddingST};
    border-left: 10px solid ${({ theme }) => theme.borderColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    font-style: italic;
    font-size: ${({ theme }) => theme.fontSizeXS};
  }
`;
