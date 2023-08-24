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

  textarea {
    border: none;
    background: transparent;
    -webkit-appearance: none;
    -moz-apperarance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
    outline: none;
    padding: 0px;
    resize: none;
    width: 100%;
    overflow: hidden;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    -ms-box-shadow: none;
    -o-box-shadow: none;
    box-shadow: none;
}
`;

export default MainStyles;
