import styled from "styled-components";

const ErrorComponent = ({ err, onClose }) => {
  setTimeout(() => {
    onClose();
  }, 4000);

  if (typeof err === "string") {
    return (
      <StyledErrorComponent>
        <div>
          <div className="error-title">
            Handled Error
            <button onClick={onClose}>
              <div>X</div>
            </button>
          </div>
          <div className="error-text">{err}</div>
        </div>
      </StyledErrorComponent>
    );
  }

  return (
    <StyledErrorComponent>
      <div>
        <div className="error-title">
          {err.code}
          <button onClick={onClose}>
            <div>X</div>
          </button>
        </div>
        <div className="error-text">
          {err.name}: {err.message}
        </div>
      </div>
    </StyledErrorComponent>
  );
};

export default ErrorComponent;

const StyledErrorComponent = styled.div`
  position: fixed;
  left: calc(50% - 100px);
  bottom: 40px;
  animation-name: DropOut;
  animation-duration: 4s;
  width: 200px;
  border: 1px solid #fd6557;
  background-image: url("/other/error.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #ff9d84;
  .error-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #fd6557;
    padding: 3px 6px 3px 30px;
    button {
      border: none;
      outline: none;
      background-color: transparent;
      padding: 0;
      margin: 0;
    }
  }
  .error-text {
    padding: 6px;
  }

  @keyframes DropOut {
    from {
      opacity: 1;
      display: block;
    }
    to {
      opacity: 0;
      display: none;
    }
  }
`;
