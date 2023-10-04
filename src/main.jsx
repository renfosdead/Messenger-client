import ReactDOM from "react-dom/client";
import App from "@/components/App.jsx";
import MainStyles from "@/theme/MainStyles";
import ThemeProvider from "./theme/ThemeProvider";
import { OneSignalInit } from "./utils/OneSignal";

const renderReactDom = () =>
  ReactDOM.createRoot(document.getElementById("root")).render(
    <>
      <MainStyles />
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </>
  );

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
