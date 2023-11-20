import classNames from "classnames";
import { useState } from "react";
import { ClickOutside } from "@/utils/ClickOutside";
import EmojiPicker from "emoji-picker-react";
import styled from "styled-components";

const Smiles = ({
  theme = {},
  textExpanded,
  isKeyboardOpen,
  value,
  onChange,
  onSend,
}) => {
  const [enabled, setEnabled] = useState(false);

  const onCancel = () => {
    onChange("");
    setEnabled(false);
  };

  const className = classNames({
    enabled: enabled,
    disabled: !enabled,
    button: true,
    simple: !enabled,
  });

  const dropdownClassName = classNames({
    "dropdown-menu": true,
    "text-expanded": textExpanded,
    "with-keyboard": isKeyboardOpen,
  });

  const saveValue = async () => {
    setEnabled(false);
    onSend();
  };

  const chooseEmoji = ({ emoji }) => {
    onChange(emoji);
  };

  return (
    <StyledSmiles>
      <button className={className} onClick={() => setEnabled(!enabled)}>
        <img src="/icons/smiles.png" />
      </button>
      {enabled && (
        <ClickOutside className={dropdownClassName} onClickOutside={onCancel}>
          <EmojiPicker
            skinTonesDisabled={true}
            width="100%"
            height="50vh"
            searchPlaceholder="Поиск..."
            theme={theme.smileTheme}
            previewConfig={{
              defaultEmoji: "1f90d",
              defaultCaption: "---- Тут будет описание----",
              showPreview: false,
            }}
            searchDisabled={true}
            onEmojiClick={chooseEmoji}
          />

          {!textExpanded && (
            <div className="smiles__confirm">
              <button className="flat-btn" onClick={onCancel}>
                Отмена
              </button>
              <button className="flat-btn" onClick={saveValue}>
                OK {value}
              </button>
            </div>
          )}
        </ClickOutside>
      )}
    </StyledSmiles>
  );
};

export default Smiles;

const StyledSmiles = styled.div`
  .dropdown-menu {
    position: fixed;
    left: 0;
    right: 0;
    bottom: calc(
      ${({ theme }) => theme.buttonHeight} + ${({ theme }) => theme.borderWidth}
    );
    background: ${({ theme }) => theme.backgroundColor};
    padding-top: ${({ theme }) => theme.paddingST};
    padding-bottom: ${({ theme }) => theme.paddingLG}!important;

    .close-btn {
      position: absolute;
      right: 0;
      top: ${({ theme }) => theme.paddingST};
      width: ${({ theme }) => theme.buttonHeight};
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .smiles__confirm {
      display: flex;
      gap: ${({ theme }) => theme.paddingST};
      padding-top: ${({ theme }) => theme.paddingLG};
      button {
        width: 100%;
      }
    }

    .EmojiPickerReact {
      border-radius: ${({ theme }) => theme.borderRadius};
    }

    &.text-expanded {
      bottom: calc(
        ${4} * ${({ theme }) => theme.fontSize} + 3 *
          ${({ theme }) => theme.buttonHeight} + 7 *
          ${({ theme }) => theme.paddingSM} + 3 *
          ${({ theme }) => theme.paddingST} + 5 *
          ${({ theme }) => theme.borderWidth}
      );
      &.with-keyboard {
        bottom: calc(
          ${4} * ${({ theme }) => theme.fontSize} + 2 *
            ${({ theme }) => theme.paddingLG} + 6 *
            ${({ theme }) => theme.borderWidth} + 2 *
            ${({ theme }) => theme.paddingSM} +
            ${({ theme }) => theme.buttonHeight}
        );
      }
    }
  }
`;
