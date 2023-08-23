import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Statuses from "./Statuses";
import Statuses2 from "./Statuses2";
import Sound from "./Sound";
import History from "./History";
import Files from "./Files";
import Key from "./Key";
import Theme from "./Theme";
import Info from "./Info";

function App() {
  return (
    <StyledApp>
      <div className="top">
        <Sound />
        <History />
        <Files />
        <Theme />
        <Key />
        <Info />
      </div>
      <FontAwesomeIcon icon={faEnvelope} />

      <div className="top">
        <Statuses />
        <Statuses2 />
      </div>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  .top {
    display: flex;
  }
`;
