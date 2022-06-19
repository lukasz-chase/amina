import styled from "styled-components";

type Props = {
  darkmode: boolean;
};

export const SettingsWrapper = styled.div<Props>`
  margin-top: 3rem;
  border-radius: 10px;
  background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  @media screen and (max-width: 1100px) {
    width: 100%;
    order: 2;
  }
  .error {
    align-self: center;
    color: red;
  }
  .line {
    height: 1px;
    margin: 0.5rem 0;
    width: 90%;
    background-color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
  }
  span {
    font-size: 20px;
    margin: 0.5rem 0;
    color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
  }
  .MuiInputBase-input {
    padding: 0.5rem;
    background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
    color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
  }
  .input {
    border: ${({ darkmode }) =>
      darkmode ? "1px solid #343536" : "1px solid black"};
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .submit {
    padding: 0.5rem;
    width: 20%;
    background: ${({ darkmode }) => (darkmode ? "#C8CBCD" : "#1484D6")};
    color: ${({ darkmode }) => (darkmode ? "black" : "white")};
    border-radius: 5rem;
    margin: 0.5rem 0;
    align-self: flex-end;
    text-align: center;
  }
`;
