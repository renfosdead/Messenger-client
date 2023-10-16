import classNames from "classnames";
import { useState } from "react";
import styled from "styled-components";
import { ClickOutside } from "@/utils/ClickOutside";
import SliderField from "./SliderField";
import ColorField from "./ColorField";
import { useTheme } from "@/hooks/useTheme";
import ExpandableGroup from "./ExpandableGroup";

const Theme = () => {
  const [enabled, setEnabled] = useState(false);

  const [expandedGroup, setExpanded] = useState(0);

  const className = classNames({
    enabled: enabled,
    disabled: !enabled,
    button: true,
  });

  const { themeState, changeTheme, saveTheme, resetTheme } = useTheme();

  const getBorderWidth = () => {
    const borderStyle = themeState.borderStyle.split(" ");
    return borderStyle[0];
  };

  const changeBorderWidth = (value) => {
    const borderStyle = themeState.borderStyle.split(" ");
    const payload = {
      borderStyle: `${value.borderWidth} ${borderStyle[1]} ${borderStyle[2]}`,
    };
    changeTheme(payload);
  };

  const getBorderColor = () => {
    const borderStyle = themeState.borderStyle.split(" ");
    return borderStyle[2];
  };

  const changeBorderColor = (value) => {
    const borderStyle = themeState.borderStyle.split(" ");
    const payload = {
      borderStyle: `${borderStyle[0]} ${borderStyle[1]} ${value.borderColor}`,
    };
    changeTheme(payload);
  };

  const getShadowColor = () => {
    const shadowStyle = themeState.innerBoxShadow.split(" ");
    return shadowStyle.slice(5).join(" ");
  };

  const changeShadowColor = (value) => {
    const shadowStyle = themeState.innerBoxShadow.split(" ");
    const payload = {
      innerBoxShadow:
        shadowStyle.slice(0, 5).join(" ") + value.innerBoxShadowColor,
    };
    changeTheme(payload);
  };

  const getShadowSize = () => {
    const shadowStyle = themeState.innerBoxShadow.split(" ");
    return shadowStyle[1];
  };

  const changeShadowSize = (value) => {
    const shadowStyle = themeState.innerBoxShadow.split(" ");
    const size = value.innerBoxShadowSize + " ";
    const payload = {
      innerBoxShadow:
        shadowStyle[0] + " " + size + size + size + 0 + getShadowColor(),
    };
    changeTheme(payload);
  };

  const [isPreview, setIsPreview] = useState(false);
  const showTheme = () => {
    setIsPreview(true);
  };
  const hideTheme = () => {
    setIsPreview(false);
  };

  const dropdownClassName = classNames({
    "dropdown-menu": true,
    preview: isPreview,
  });

  return (
    <StyledTheme onClick={isPreview ? hideTheme : undefined}>
      <button className={className} onClick={() => setEnabled(!enabled)}>
        <img src={"/icons/theme.png"} />
      </button>

      {enabled && (
        <ClickOutside
          className={dropdownClassName}
          onClickOutside={() => setEnabled(false)}
        >
          <div className="theme__confirm">
            <button onClick={resetTheme}>Сброс</button>
            <button onClick={showTheme}>Смотреть</button>
          </div>

          <ExpandableGroup
            label="Шрифт"
            index={0}
            expandedGroup={expandedGroup}
            setExpanded={setExpanded}
          >
            <SliderField
              onChange={changeTheme}
              label="Основной"
              name="fontSize"
              data={themeState}
            />
            <SliderField
              onChange={changeTheme}
              label="Маленький"
              name="fontSizeSM"
              data={themeState}
            />
            <SliderField
              onChange={changeTheme}
              label="Очень маленький"
              name="fontSizeXS"
              data={themeState}
            />
          </ExpandableGroup>

          <ExpandableGroup
            label="Отступы"
            index={1}
            expandedGroup={expandedGroup}
            setExpanded={setExpanded}
          >
            <SliderField
              onChange={changeTheme}
              label="Маленький"
              name="paddingSM"
              data={themeState}
            />
            <SliderField
              onChange={changeTheme}
              label="Стандартный"
              name="paddingST"
              data={themeState}
            />
            <SliderField
              onChange={changeTheme}
              label="Большой"
              name="paddingLG"
              data={themeState}
            />
          </ExpandableGroup>

          <ExpandableGroup
            label="Размеры кнопок"
            index={2}
            expandedGroup={expandedGroup}
            setExpanded={setExpanded}
          >
            <SliderField
              onChange={changeTheme}
              label="Высота"
              name="buttonHeight"
              data={themeState}
            />
            <SliderField
              onChange={changeTheme}
              label="Иконки"
              name="buttonImageHeight"
              data={themeState}
            />
          </ExpandableGroup>

          <ExpandableGroup
            label="Цвета"
            index={3}
            expandedGroup={expandedGroup}
            setExpanded={setExpanded}
          >
            <ColorField
              onChange={changeTheme}
              label="Фон"
              name="backgroundColor"
              data={themeState}
            />
            <ColorField
              onChange={changeTheme}
              label="Неактивные элементы"
              name="gradientInactiveColor"
              data={themeState}
            />
            <ColorField
              onChange={changeTheme}
              label="Активные элементы"
              name="gradientActiveColor"
              data={themeState}
            />
            <ColorField
              onChange={changeTheme}
              label="Входящие"
              name="inColor"
              data={themeState}
            />
            <ColorField
              onChange={changeTheme}
              label="Исходящие"
              name="outColor"
              data={themeState}
            />
          </ExpandableGroup>

          <ExpandableGroup
            label="Границы"
            index={4}
            expandedGroup={expandedGroup}
            setExpanded={setExpanded}
          >
            <ColorField
              onChange={changeBorderColor}
              label="Цвет"
              name="borderColor"
              value={getBorderColor()}
            />
            <SliderField
              onChange={changeBorderWidth}
              label="Толщина"
              name="borderWitdh"
              value={getBorderWidth()}
            />
            <SliderField
              onChange={changeTheme}
              label="Закругление"
              name="borderRadius"
              data={themeState}
            />
          </ExpandableGroup>

          <ExpandableGroup
            label="Тени"
            index={5}
            expandedGroup={expandedGroup}
            setExpanded={setExpanded}
          >
            <ColorField
              onChange={changeShadowColor}
              label="Цвет"
              name="innerBoxShadowColor"
              value={getShadowColor()}
            />
            <SliderField
              onChange={changeShadowSize}
              label="Размер"
              name="innerBoxShadowSize"
              value={getShadowSize()}
            />
          </ExpandableGroup>

          <div className="theme__confirm">
            <button onClick={() => setEnabled(false)}>Отмена</button>
            <button
              onClick={() => {
                saveTheme();
                setEnabled(false);
              }}
            >
              ОК
            </button>
          </div>
        </ClickOutside>
      )}
    </StyledTheme>
  );
};

export default Theme;

const StyledTheme = styled.div`
  position: relative;
  .dropdown-menu {
    position: absolute;
    right: ${({ theme }) => theme.buttonHeight};
    top: 0;
    background: ${({ theme }) => theme.backgroundColor};
    padding-top: ${({ theme }) => theme.paddingLG}!important;
    padding-bottom: ${({ theme }) => theme.paddingLG}!important;
    display: flex;
    flex-direction: column;
    width: auto;
    &.preview {
      opacity: 0.1;
    }
    button,
    input {
      font-size: ${({ theme }) => theme.fontSize};
    }
    input {
      line-height: 2;
      border-radius: ${({ theme }) => theme.borderRadius};
    }
    .theme__confirm {
      display: flex;
      gap: ${({ theme }) => theme.paddingST};
      justify-content: space-between;
      &:first-of-type {
        padding-bottom: ${({ theme }) => theme.paddingST};
      }
      &:last-of-type {
        padding-top: ${({ theme }) => theme.paddingLG};
      }
      button {
        min-width: 100px;
      }
    }
  }
`;
