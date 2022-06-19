import styled from "styled-components";

interface LoginProps {
  darkmode: boolean;
}

export const LoginComponent = styled.div<LoginProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 94vh;
  color: #d7dadc;
  background: ${({ darkmode }) => (darkmode ? "#030303" : "#DAE0E6")};
  h1 {
    color: ${({ darkmode }) => (darkmode ? "#B4B7B9" : "black")};
  }
  h2 {
    font-size: 1rem;
    text-align: center;
    color: ${({ darkmode }) => (darkmode ? "#B4B7B9" : "black")};
  }
  .form {
    display: flex;
    flex-direction: column;
    .false-username,
    .false-password {
      color: red;
    }
    .error,
    .success {
      text-align: center;
    }
    .error {
      color: red;
    }
    .success {
      color: green;
    }
    .label {
      margin: 1rem 0;
      color: ${({ darkmode }) => (darkmode ? "#B4B7B9" : "black")};
    }
    .login,
    .password {
      background-color: ${({ darkmode }) =>
        darkmode ? "#272729" : "rgba(66, 164, 245,0.3)"};
      color: ${({ darkmode }) => (darkmode ? "#B4B7B9" : "black")};
    }
    .submit-button {
      margin: 1rem 0;
      background-color: ${({ darkmode }) => (darkmode ? "#272729" : "#0079d3")};
      color: ${({ darkmode }) => (darkmode ? "#B4B7B9" : "white")};
      padding: 0.5rem;
      border-radius: 5rem;
      border: none;
    }
    .sing-up {
      color: ${({ darkmode }) => (darkmode ? "white" : "black")};
      .link {
        color: ${({ darkmode }) => (darkmode ? "#B4B7B9" : "#0079d3")};
        text-transform: uppercase;
        cursor: pointer;
        text-decoration: none;
      }
    }
    .error {
      color: tomato;
    }
  }
`;
