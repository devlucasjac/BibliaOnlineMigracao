import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body{
    padding-top: 4%;
    padding-bottom: 2%;
    background-color: var(--gray-100);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body,
  input,
  textarea,
  button {
    font: 500 1rem Inter, sans-serif;
    color: var(--gray-800);
  }

  button {
    cursor: pointer;
  }
`;
