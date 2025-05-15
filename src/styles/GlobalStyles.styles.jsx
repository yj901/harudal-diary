import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  
  @font-face {
    font-family: 'RIDIBatang';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  * {
    box-sizing: border-box;
  }

  ul,li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    width: 100%;
    height: 100vh;
    position: relative;
    font-family: 'RIDIBatang';
    font-weight: 400;
    background: var(--bg);
    color: var(--light);
      display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  button {
    border: none;
    background: none;
  }

  :root {
    --bg: #2D3145;
    --light: #fff;
    --stext: #E5EAFD;
    --day: #BBBAD0;
    --todayCircle: #4B5069;
    --happy : #FEE184;
    --sad: #83B2FF;
    --angry: #FF8787;
    --calm: #F3F4F6;
    --moonshadow: rgba(10, 10, 29, 0.8);
    --box: #353A50;
    --modal: #2F334C;
    --cancel: ##434867;
    --delete: #EF4444;
    --shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.20);
    --shadow2: 4px 4px 20px 0px rgba(0, 0, 0, 0.20);
  }
`;

export default GlobalStyles;
