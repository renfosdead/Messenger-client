import ReactDOM from "react-dom/client";
import App from "@/components/App.jsx";
import MainStyles from "@/theme/MainStyles";
import ThemeProvider from "./theme/ThemeProvider";

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

const OneSignalInit = () => {
  // Uncomment to set OneSignal device logging to VERBOSE
  // window.plugins.OneSignal.Debug.setLogLevel(6);

  // Uncomment to set OneSignal visual logging to VERBOSE
  // window.plugins.OneSignal.Debug.setAlertLevel(6);

  // NOTE: Update the init value below with your OneSignal AppId.
  window.plugins.OneSignal.initialize(import.meta.env.VITE_ONE_SIGNAL_APP_ID);

  //Adds an event listener for clicks on notifications
  const listener = (event) => {
    // const notificationData = JSON.stringify(event);
  };
  window.plugins.OneSignal.Notifications.addEventListener("click", listener);
  window.plugins.OneSignal.Notifications.requestPermission(true).then(
    (accepted) => {
      // console.log("User accepted notifications: " + accepted);
    }
  );
};
