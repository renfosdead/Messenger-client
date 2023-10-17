import styled from "styled-components";

const SliderField = ({ label, value, unit = "px", name, data, onChange }) => {
  const srcValue = value || data[name] || "";

  const getParsedValue = () => {
    return srcValue.slice(0, srcValue.length - unit.length);
  };

  const changeSlider = (e) => {
    const val = e.target.value;
    onChange({ [name]: val + unit });
  };

  return (
    <StyledSlider>
      <div className="slider-label">
        <div>{`${label}:`}</div>
        <div>{srcValue}</div>
      </div>
      <input
        type="range"
        min={1}
        max={50}
        value={getParsedValue()}
        onChange={changeSlider}
      />
    </StyledSlider>
  );
};

export default SliderField;

const StyledSlider = styled.div`
  position: relative;
  margin-bottom: calc(2 * ${({ theme }) => theme.paddingST});

  .slider-label {
    display: flex;
    justify-content: space-between;
  }

  input[type="range"] {
    width: calc(100% - 2 * ${({ theme }) => theme.paddingST});
    -webkit-appearance: none;
    height: 5px;
    border-radius: ${({ theme }) => theme.borderRadius};
    background-image: linear-gradient(
      ${({ theme }) => theme.backgroundColor},
      ${({ theme }) => theme.gradientActiveColor}
    );
    background-repeat: no-repeat;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.gradientInactiveColor};
    background-image: linear-gradient(
      ${({ theme }) => theme.backgroundColor},
      ${({ theme }) => theme.gradientActiveColor}
    );
    cursor: pointer;
    border: ${({ theme }) => theme.borderWidth} solid
      ${({ theme }) => theme.borderColor};
  }
`;
