import { createGlobalStyle } from "styled-components";
import Nunito from "@/fonts/Nunito-Regular.ttf";
// import NunitoLight from "@/fonts/Nunito-Light.ttf";

const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'Nunito';
    src: url(${Nunito}) format('truetype');
  }
  body {
    font-family: "Nunito";
    font-size: 16px;
  }

  button {
    font-family: "Nunito";
    width: 100%;
    height: 30px;
    border: 2px solid #778aa1;
    border-radius: 3px;
    background: linear-gradient(#ffffff 40%, #ced9e7 55%, #ced9e7);
    &:hover {
      background: linear-gradient(#ffffff, #b6cbe5);
    }
    &:active {
      background: #b6cbe5;
      box-shadow: inset 2px 2px 2px 0 rgba(0,0,0,0.5);
    }
  }

  input {
    outline: none;
    font-size: 16px;
    padding: 3px;
  }

  label {
    font-size: 16px;
  }
`;

export default FontStyles;
