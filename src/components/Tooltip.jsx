import styled from "styled-components";

const TootipComponent = ({ type = "error", text, onClose }) => {
  setTimeout(() => {
    onClose();
  }, 4000);

  const title =
    type === "error" ? "Handled Error" : type === "success" ? "ОК" : "";

  if (typeof text === "string") {
    return (
      <StyledTootipComponent className={type}>
        <div>
          <div className="tooltip-title">
            {title}
            <button className="close-btn" onClick={onClose}>
              <div>X</div>
            </button>
          </div>
          <div className="tooltip-text">{text}</div>
        </div>
      </StyledTootipComponent>
    );
  }

  return (
    <StyledTootipComponent className={type}>
      <div>
        <div className="tooltip-title">
          {text.code}
          <button className="close-btn" onClick={onClose}>
            <div>X</div>
          </button>
        </div>
        <div className="tooltip-text">
          {text.name}: {text.message}
        </div>
      </div>
    </StyledTootipComponent>
  );
};

export default TootipComponent;

const StyledTootipComponent = styled.div`
  position: fixed;
  left: calc(50% - 100px);
  bottom: 40px;
  animation-name: DropOut;
  animation-duration: 4s;
  width: 200px;

  background-repeat: no-repeat;
  background-size: contain;

  .tooltip-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 6px 3px 30px;
  }
  .tooltip-text {
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

  &.error {
    background-image: url("/other/error.png");
    background-color: #ff9d84;
    border: 1px solid #fd6557;

    .tooltip-title {
      border-bottom: 1px solid #fd6557;
    }
  }

  &.success {
    background-image: url("/other/success.png");
    background-color: #c9ff85;
    border: 1px solid #aeff49;

    .tooltip-title {
      border-bottom: 1px solid #aeff49;
    }
  }
`;
