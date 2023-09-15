import classNames from "classnames";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { ClickOutside } from "@/utils/ClickOutside";
import store from "@/utils/store";
import UserApi from "@/api/user";
import { isOffline } from "../utils/data";

const Info = ({ refresh }) => {
  const [enabled, setEnabled] = useState(false);
  const [value, setValue] = useState("");

  const saveValue = async () => {
    if (isOffline()) {
      store.name.set(value);
      setEnabled(false);
    } else {
      const result = await UserApi.changeName(value);
      if (result.data) {
        store.name.set(value);
        setEnabled(false);
        refresh();
      }
    }
  };

  useEffect(() => {
    if (enabled) {
      setValue(store.name.get());
    }
  }, [enabled]);

  const className = classNames({
    enabled: enabled,
    disabled: !enabled,
    button: true,
  });
  return (
    <StyledInfo>
      <button className={className} onClick={() => setEnabled(!enabled)}>
        <img src={"/icons/info.png"} />
      </button>

      {enabled && (
        <ClickOutside
          className="dropdown-menu"
          onClickOutside={() => setEnabled(false)}
        >
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <div className="username__confirm">
            <button onClick={() => setEnabled(false)}>Cancel</button>
            <button onClick={saveValue}>OK</button>
          </div>
        </ClickOutside>
      )}
    </StyledInfo>
  );
};

export default Info;

const StyledInfo = styled.div`
  position: relative;
  .dropdown-menu {
    position: absolute;
    width: 200px;
    right: 0;
    top: calc(${({ theme }) => theme.buttonHeight} - 1px);
    background: ${({ theme }) => theme.backgroundColor};
    padding-top: ${({ theme }) => theme.paddingLG}!important;
    padding-bottom: ${({ theme }) => theme.paddingLG}!important;
    display: flex;
    gap: ${({ theme }) => theme.paddingLG};
    flex-direction: column;
    button,
    input {
      font-size: ${({ theme }) => theme.fontSize};
    }
    input {
      line-height: 2;
      border-radius: ${({ theme }) => theme.borderRadius};
    }
    .username__confirm {
      display: flex;
      gap: ${({ theme }) => theme.paddingST};
      button {
        width: 100%;
      }
    }
  }
`;
