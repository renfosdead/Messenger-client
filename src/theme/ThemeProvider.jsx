import { ThemeProvider as ThemeProviderStyled } from "styled-components";
import config from "./config.json";

const ThemeProvider = ({ children }) => {
  const theme = {
    ...config,
  };
  return <ThemeProviderStyled theme={theme}>{children}</ThemeProviderStyled>;
};

export default ThemeProvider;
