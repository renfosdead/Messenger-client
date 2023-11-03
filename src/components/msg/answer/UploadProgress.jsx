import styled from "styled-components";

const UploadProgress = ({ value }) => {
  if (!value) return null;

  return (
    <StyledUploadProgress className="progress">
      <div style={{ width: `${value}%` }}></div>
    </StyledUploadProgress>
  );
};

export default UploadProgress;

const StyledUploadProgress = styled.div`
  display: flex;
  width: calc(100vw - 3 * ${({ theme }) => theme.buttonHeight});
  align-items: center;

  > div {
    height: ${({ theme }) => theme.buttonImageHeight};
    border: ${({ theme }) => theme.borderWidth} solid
      ${({ theme }) => theme.borderColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ theme }) => theme.borderColor};
  }
`;
