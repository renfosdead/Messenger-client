export const OneSignalInit = async () => {
  if (window?.plugins?.OneSignal) {
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
        console.log("User accepted notifications: " + accepted);
      }
    );
  }
};

export const getDeviceSubscription = () => {
  if (window?.plugins?.OneSignal) {
    return window.plugins.OneSignal.User.pushSubscription.id;
  }
  return "";
};

export const login = (userId) => {
  if (window?.plugins?.OneSignal) {
    window.plugins.OneSignal.login(userId);
  }
};

export const logout = () => {
  if (window?.plugins?.OneSignal) {
    window.plugins.OneSignal.logout();
  }
};
