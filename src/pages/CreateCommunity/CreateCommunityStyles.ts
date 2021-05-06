import styled from "styled-components";

type Props = {
  darkmode: boolean;
  ready: boolean;
};

export const CreateCommunityComponent = styled.div<Props>`
  min-height: 93vh;
  background-color: ${({ darkmode }) => (darkmode ? "#030303" : "#DAE0E6")};
  color: ${({ darkmode }) => (darkmode ? "#D2D5D7" : "black")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px) {
    align-items: stretch;
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
    .community-name,
    .community-backg,
    .community-logo {
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
    .community-desc {
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
      width: 50%;
      background: ${({ darkmode }) => (darkmode ? "#C8CBCD" : "#1484D6")};
      color: ${({ darkmode }) => (darkmode ? "black" : "white")};
      outline: none;
      border: none;
      border-radius: 5rem;
      margin: 0.5rem 0;
      align-self: flex-end;
    }
  }
`;
