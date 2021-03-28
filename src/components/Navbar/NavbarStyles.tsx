import styled from "styled-components";
import { Link } from "react-router-dom";

type NavProps = {
  darkMode: boolean;
};

export const Nav = styled.nav<NavProps>`
  background: ${({ darkMode }) => (darkMode ? "#1a1a1b" : "white")};
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled(Link)<NavProps>`
  display: flex;
  align-items: center;
  color: ${({ darkMode }) => (darkMode ? "white" : "black")};
  h1 {
    margin-left: 5px;
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
  span {
    color: #ffdc5d;
  }
  .logo-icon {
    margin-left: 15px;
    height: 4vh;
    width: 4vh;
  }
`;
export const TextInput = styled.div<NavProps>`
  .textField {
    color: ${({ darkMode }) => (darkMode ? "white" : "gray")};
    border: 1px solid gray;
    width: 40vw;
    background-color: ${({ darkMode }) => (darkMode ? "#272729" : "lightgray")};
    border-radius: 5px;
    font-family: "Noto Sans", sans-serif;
    @media screen and (max-width: 1000px) {
      width: 50vw;
    }
    &:hover {
      border: 1px solid #d7dadc;
    }
    &:focus {
      border: 1px solid #d7dadc;
    }
    .search-icon {
      color: #818384;
      font-size: 1.5rem;
      margin-left: 10px;
    }
  }
`;
export const Buttons = styled.div<NavProps>`
  display: flex;
  align-items: center;
  button {
    width: 8rem;
    padding: 0.5rem;
    margin: 0 0.5rem;
    border-radius: 1rem;
    transition: all 0.2s ease-in-out;
    font-weight: bold;
  }
  .login,
  .sign-up {
    cursor: pointer;
    @media screen and (max-width: 620px) {
      display: none;
    }
  }
  .login {
    background: ${({ darkMode }) => (darkMode ? "black" : "white")};
    color: ${({ darkMode }) => (darkMode ? "white" : "#1484D6")};
    border: ${({ darkMode }) =>
      darkMode ? "1px solid white" : "1px solid #1484D6 "};
    &:hover {
      background-color: ${({ darkMode }) => (darkMode ? "#272729" : "white")};
    }
  }
  .sign-up {
    background: ${({ darkMode }) => (darkMode ? "#c8cbcd" : "#1484D6")};
    color: ${({ darkMode }) => (darkMode ? "#101011" : "white")};
    border: ${({ darkMode }) =>
      darkMode ? "1px solid #0e0e0f" : "1px solid #1484D6"};
  }
`;

export const Account = styled.div<NavProps>`
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  margin-right: 1rem;
  border: ${({ darkMode }) =>
    darkMode ? "1px solid #1a1a1b" : "1px solid white"};
  cursor: pointer;
  &:hover {
    border: 1px solid #636366;
  }
  .account-icon {
    font-size: 1.5rem;
    color: #818384;
  }
`;
