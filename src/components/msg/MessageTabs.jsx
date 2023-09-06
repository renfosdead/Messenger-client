import { useState } from "react";
import MessageTab from "./MessageTab";
import styled from "styled-components";

const MessageTabs = ({ events }) => {
  const [activeTab, setActiveTab] = useState("chat");

  const changeActiveTab = (key) => {
    setActiveTab(key);
  };

  return (
    <StyledMessageTabs>
      <div className={activeTab === "chat" ? "active" : "disabled"}>
        <MessageTab
          userId={"userId"}
          isActive={activeTab === "chat"}
          onClickTab={() => changeActiveTab("chat")}
          events={events}
        />
      </div>
      <div className={activeTab === "notes" ? "active" : "disabled"}>
        <MessageTab
          right={true}
          userId={null}
          isActive={activeTab === "notes"}
          onClickTab={() => changeActiveTab("notes")}
        />
      </div>
    </StyledMessageTabs>
  );
};
export default MessageTabs;
const StyledMessageTabs = styled.div`
  position: relative;
  margin-top: ${({ theme }) => theme.buttonHeight};
  > div {
    background-color: ${({ theme }) => theme.backgroundColor};
    z-index: 2;
    &.disabled {
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      z-index: 1;
    }
  }
`;
