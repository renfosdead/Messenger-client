import ReactDOM from "react-dom/client";
import ErrorComponent from "../components/Error";

const closeError = () => {
  const container = document.getElementById("popup-container");
  if (container) {
    container.removeChild(container.childNodes[0]);
  }
};

export const renderError = (error) => {
  const container = document.getElementById("popup-container");
  if (container) {
    ReactDOM.createRoot(container).render(
      <ErrorComponent err={error} onClose={closeError} />
    );
  }
};
