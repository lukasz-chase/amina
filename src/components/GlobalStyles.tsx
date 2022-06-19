import { createGlobalStyle } from "styled-components";

type Props = {
  darkmode: boolean;
};

const GlobalStyles = createGlobalStyle<Props>`
*{
    box-sizing:border-box;
    padding:0;
    margin:0;
    font-family: 'Noto Sans', sans-serif;
}
.MuiFilledInput-root{
    background-color: ${({ darkmode }) => (darkmode ? "#272729" : "white")};
    color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
}
.MuiInputBase-root{
    background-color: ${({ darkmode }) => (darkmode ? "#272729" : "white")};
    color: ${({ darkmode }) => (darkmode ? "#CDD0D2 !important" : "black")};
}
  .input {
    background-color: ${({ darkmode }) => (darkmode ? "#272729" : "white")};
    color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
    margin-bottom: 0.5rem;
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
    .text {
      color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
    }
  }
  input[type="file"] {
    display: none;
  }
  .custom-file-upload {
    background-color: ${({ darkmode }) => (darkmode ? "#272729" : "white")};
    border: ${({ darkmode }) =>
      darkmode ? "1px solid #272729" : "1px solid black"};
    display: flex;
    justify-content:center;
    align-items: center;
    padding: 6px 12px;
    cursor: pointer;
    color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
  }
  .MuiFormControl-root {
    border: ${({ darkmode }) =>
      darkmode ? "1px solid #272729" : "1px solid black"};
  }
  .textField {
    padding: 0.5rem;
    width: 51vw;
    font-family: "Noto Sans", sans-serif;
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
  }
  .inputImg{
    height: 10vh;
    width: 20vw;
    object-fit:cover ;
  }
`;

export default GlobalStyles;
