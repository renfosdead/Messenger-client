import styled from "styled-components";
import Checkbox from "../../Checkbox";

const CheckboxField = ({
  label,
  checkedValue,
  uncheckedValue,
  name,
  data,
  onChange,
}) => {
  const changeCheckbox = (val) => {
    onChange({ [name]: val ? checkedValue : uncheckedValue });
  };

  const checked = data[name] === checkedValue;

  return (
    <StyledCheckbox>
      <Checkbox
        label={label}
        name={name}
        checked={checked}
        onChange={changeCheckbox}
      />
    </StyledCheckbox>
  );
};

export default CheckboxField;

const StyledCheckbox = styled.div`
  position: relative;
  margin-bottom: calc(2 * ${({ theme }) => theme.paddingST});
  white-space: nowrap;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
