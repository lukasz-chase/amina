import styled from "styled-components";

type Props = {
  darkmode: boolean;
  ready: boolean;
};

export const CreatePostComponent = styled.div<Props>`
  min-height: 93vh;
  background-color: ${({ darkmode }) => (darkmode ? "#030303" : "#DAE0E6")};
  color: ${({ darkmode }) => (darkmode ? "#D2D5D7" : "black")};
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: stretch;
  }
  .left {
    @media screen and (max-width: 1000px) {
      margin-bottom: 1rem;
    }
    h1 {
      width: 35rem;
      margin: 1rem 0;
      border-bottom: ${({ darkmode }) =>
        darkmode ? "1px solid #1C1C1D" : "1px solid white"};
      @media screen and (max-width: 1000px) {
        width: 100%;
      }
    }

    .choose-community {
      position: relative;
      .wrapper {
        width: 20vw;
        background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
        padding: 1rem;
        margin: 1rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media screen and (max-width: 1000px) {
          width: 100%;
          padding: 0.5rem;
        }
      }
      span {
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          height: 2rem;
          width: 2rem;
          border-radius: 2rem;
          object-fit: cover;
        }
      }
    }
    .form {
      display: flex;
      flex-direction: column;
      border: 1px solid #272729;
      background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
      padding: 0.5rem;
      @media screen and (max-width: 1000px) {
        width: 100%;
      }
      .MuiInputBase-input {
        padding: 0.5rem;
        background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
        color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
      }
      .post-title,
      .post-image {
        border: ${({ darkmode }) =>
          darkmode ? "1px solid #343536" : "1px solid black"};
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        @media screen and (max-width: 1000px) {
          width: 100%;
        }
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
          width: 100%;
        }
      }
      .submit {
        padding: 0.5rem;
        cursor: ${({ ready }) => (ready ? "pointer" : "no-drop")};
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
  .right {
    margin: 0 1rem;
    .rules {
      padding: 1rem;
      background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
      width: fit-content;

      ul {
        li {
          list-style: inside;
          list-style-type: decimal;
          border-bottom: ${({ darkmode }) =>
            darkmode ? "1px solid #818384" : "1px solid #7C7C7C"};
          margin: 0.5rem 0;
          padding: 0.5rem 0;
        }
      }
    }
    span,
    p {
      font-size: 0.7rem;
      color: ${({ darkmode }) => (darkmode ? "#818384" : "#7C7C7C")};
    }
  }
`;
