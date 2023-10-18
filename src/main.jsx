import ReactDOM from "react-dom/client";
import App from "@/components/App.jsx";
import { OneSignalInit } from "./utils/OneSignal";

const renderReactDom = () =>
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);

if (window.cordova) {
  document.addEventListener(
    "deviceready",
    () => {
      OneSignalInit();
      renderReactDom();
    },
    false
  );
} else {
  renderReactDom();
}
