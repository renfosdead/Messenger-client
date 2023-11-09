import Loading from "@/components/Loading";
import styled from "styled-components";

const UploadProgress = ({ value, isSending }) => {
  if (!value && !isSending) return null;

  return (
    <StyledUploadProgress className="progress">
      <div style={{ width: `${value}%` }}></div>
      {isSending ? <Loading /> : null}
    </StyledUploadProgress>
  );
};

export default UploadProgress;

const StyledUploadProgress = styled.div`
  position: relative;
  display: flex;
  width: calc(100vw - 3 * ${({ theme }) => theme.buttonHeight});
  align-items: center;

  > div:first-of-type {
    height: ${({ theme }) => theme.buttonImageHeight};
    border: ${({ theme }) => theme.borderWidth} solid
      ${({ theme }) => theme.borderColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ theme }) => theme.borderColor};
  }

  .loading {
    position: absolute;
    left: 0;
    right: 0;
    width: auto;
    text-align: center;
  }
`;
