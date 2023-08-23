import { createGlobalStyle } from "styled-components";
import Nunito from "@/fonts/Nunito-Regular.ttf";

const MainStyles = createGlobalStyle`
  @font-face {
    font-family: 'Nunito';
    src: url(${Nunito}) format('truetype');
  }

  html, body, #root {
    padding: 0;
    margin: 0;
    height: 100vh;
    font-family: "Nunito"!important;
  }
`;

export default MainStyles;
