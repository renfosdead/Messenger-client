import ReactDOM from "react-dom/client";
import Tooltip from "../components/Tooltip";

const closeTooltip = () => {
  const container = document.getElementById("popup-container");
  if (container) {
    container.removeChild(container.childNodes[0]);
  }
};

export const renderError = (error) => {
  const container = document.getElementById("popup-container");
  if (container) {
    ReactDOM.createRoot(container).render(
      <Tooltip type="error" text={error} onClose={closeTooltip} />
    );
  }
};

export const renderSuccess = (text) => {
  const container = document.getElementById("popup-container");
  if (container) {
    ReactDOM.createRoot(container).render(
      <Tooltip type="success" text={text} onClose={closeTooltip} />
    );
  }
};
