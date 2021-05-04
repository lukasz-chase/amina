import styled from "styled-components";

type Props = {
  darkmode: boolean;
};

export const CreatePostComponent = styled.div<Props>`
  min-height: 93vh;
  background-color: ${({ darkmode }) => (darkmode ? "#030303" : "#DAE0E6")};
  color: ${({ darkmode }) => (darkmode ? "#D2D5D7" : "black")};
  display: flex;
  justify-content: center;
  align-items: center;
  .left {
    h1 {
      width: 35rem;
      margin: 1rem 0;
      border-bottom: ${({ darkmode }) =>
        darkmode ? "1px solid #1C1C1D" : "1px solid white"};
    }
    .choose-community {
      width: 20vw;
      background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
      padding: 1rem;
      margin: 1rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }
    .form {
      display: flex;
      flex-direction: column;
      border: 1px solid #272729;
      background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
      padding: 0.5rem;
      .MuiInputBase-input {
        padding: 0.5rem;
        background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
        color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
      }
      .post-title {
        border: ${({ darkmode }) =>
          darkmode ? "1px solid #343536" : "1px solid black"};
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        .text {
          color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
        }
      }
      .text-field {
        padding: 0.5rem;
        border: ${({ darkmode }) =>
          darkmode ? "1px solid #343536" : "1px solid black"};
        width: 51vw;
        font-family: "Noto Sans", sans-serif;
        @media screen and (max-width: 1000px) {
          width: 90vw;
        }
      }
      .submit {
        padding: 0.5rem;
        cursor: pointer;
        width: 20%;
        background: ${({ darkmode }) => (darkmode ? "#C8CBCD" : "#1484D6")};
        color: ${({ darkmode }) => (darkmode ? "black" : "white")};
        outline: none;
        border: none;
        border-radius: 5rem;
        margin: 0.5rem 0;
        align-self: flex-end;
      }
    }
  }
`;
