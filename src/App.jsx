import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Statuses from "./Statuses";
import Statuses2 from "./Statuses2";

function App() {
  return (
    <StyledApp>
      <div className="top">
        <Statuses />
        <Statuses2 />
      </div>
      <FontAwesomeIcon icon={faEnvelope} />
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  .top {
    display: flex;
  }
`;
