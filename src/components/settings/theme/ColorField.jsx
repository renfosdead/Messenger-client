import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import styled from "styled-components";

const ColorField = ({ label, name, value, data, onChange }) => {
  const srcValue = value || data[name] || "";

  const [pickerValue, setPickerValue] = useState(srcValue);

  const changeColor = () => {
    onChange({ [name]: pickerValue });
    expand(false);
  };

  const skipColor = () => {
    setPickerValue(srcValue);
    expand(false);
  };

  const [expanded, expand] = useState(false);

  return (
    <StyledColor>
      {label}
      <div
        className="picker-input"
        style={{ backgroundColor: srcValue }}
        onClick={() => expand(true)}
      ></div>
      {expanded && (
        <div className="picker-picker">
          <HexColorPicker color={pickerValue} onChange={setPickerValue} />
          <div className="picker-btns">
            <button onClick={skipColor}>Отмена</button>
            <button onClick={changeColor}>OK</button>
          </div>
        </div>
      )}
    </StyledColor>
  );
};

export default ColorField;

const StyledColor = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  gap: ${({ theme }) => theme.paddingLG};
  margin: ${({ theme }) => theme.paddingLG} 0;

  .picker-input {
    cursor: pointer;
    width: ${({ theme }) => theme.buttonImageHeight};
    height: ${({ theme }) => theme.buttonImageHeight};
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  .picker-picker {
    position: absolute;
    padding: ${({ theme }) => theme.paddingST};
    background: ${({ theme }) => theme.backgroundColor};
    border: ${({ theme }) => theme.borderStyle};
    border-radius: ${({ theme }) => theme.borderRadius};
    z-index: 7;
  }

  .picker-btns {
    display: flex;
    justify-content: space-between;
    padding: ${({ theme }) => theme.paddingST} 0 0 0;
    gap: ${({ theme }) => theme.paddingST};
    button {
      width: 100%;
    }
  }
`;
