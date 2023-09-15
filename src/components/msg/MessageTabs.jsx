import { useState } from "react";
import MessageTab from "./MessageTab";
import styled from "styled-components";
import store from "../../utils/store";

const MessageTabs = ({ events, refresh }) => {
  const [activeTab, setActiveTab] = useState("chat");

  const changeActiveTab = (key) => {
    setActiveTab(key);
  };

  const chatId = store.chatId.get();
  const userId = store.userId.get();

  return (
    <StyledMessageTabs>
      <div className={activeTab === "chat" ? "active" : "disabled"}>
        <MessageTab
          userId={userId || "-"}
          chatId={chatId}
          isActive={activeTab === "chat"}
          onClickTab={() => changeActiveTab("chat")}
          events={events}
          refresh={refresh}
        />
      </div>
      <div className={activeTab === "notes" ? "active" : "disabled"}>
        <MessageTab
          right={true}
          userId={null}
          chatId="notes"
          isActive={activeTab === "notes"}
          onClickTab={() => changeActiveTab("notes")}
          events={events}
          refresh={refresh}
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
