import classNames from "classnames";
import styled from "styled-components";

const Checkbox = ({ label, name, checked, onChange }) => {
  const changeCheckbox = (e) => {
    onChange(e.target.checked);
  };

  const checkboxClassName = classNames({
    checked,
    "checkbox-mark": true,
  });

  return (
    <StyledCheckbox className="app-checkbox">
      {label}
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={changeCheckbox}
      />
      <div className={checkboxClassName} />
    </StyledCheckbox>
  );
};

export default Checkbox;

const StyledCheckbox = styled.label`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  .checkbox-mark {
    display: inline-flex;
    align-items: center;
    user-select: none;

    &:before {
      content: "";
      display: inline-block;
      width: ${({ theme }) => theme.fontSizeSM};
      height: ${({ theme }) => theme.fontSizeSM};
      flex-shrink: 0;
      flex-grow: 0;
      border: ${({ theme }) => theme.borderWidth} solid
        ${({ theme }) => theme.borderColor};
      border-radius: ${({ theme }) => theme.borderRadius};
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 50% 50%;
    }

    &:hover,
    &:focus {
      &:before {
        border-color: ${({ theme }) => theme.borderColor};
      }
    }

    &:active {
      &:before {
        background-color: ${({ theme }) => theme.backgroundColor};
        border-color: ${({ theme }) => theme.borderColor};
      }
    }

    &.checked {
      &:before {
        border-color: ${({ theme }) => theme.borderColor};
        background-color: ${({ theme }) => theme.borderColor};
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
      }
    }
  }
`;
