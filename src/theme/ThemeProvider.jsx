import { ThemeProvider as ThemeProviderStyled } from "styled-components";

const ThemeProvider = ({ theme, children }) => {
  return <ThemeProviderStyled theme={theme}>{children}</ThemeProviderStyled>;
};

export default ThemeProvider;
