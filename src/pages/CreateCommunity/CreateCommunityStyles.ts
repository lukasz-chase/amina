import styled from "styled-components";

type Props = {
  darkmode: boolean;
  ready: boolean;
};

export const CreateCommunityComponent = styled.div<Props>`
  min-height: calc(100vh - 50px);
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
