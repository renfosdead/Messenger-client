import { ThemeProvider as ThemeProviderStyled } from "styled-components";
import { useTheme } from "../hooks/useTheme";

const ThemeProvider = ({ children }) => {
  const { themeState } = useTheme();
  const theme = {
    ...themeState,
  };
  return <ThemeProviderStyled theme={theme}>{children}</ThemeProviderStyled>;
};

export default ThemeProvider;
