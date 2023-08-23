import ReactDOM from "react-dom/client";
import App from "@/components/App.jsx";
import MainStyles from "@/theme/MainStyles";
import ThemeProvider from "./theme/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <MainStyles />
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </>
);
