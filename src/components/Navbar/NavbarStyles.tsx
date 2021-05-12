import styled from "styled-components";
import { Link } from "react-router-dom";

type NavProps = {
  $darkmode: boolean;
};

export const Nav = styled.nav<NavProps>`
  background: ${({ $darkmode: darkMode }) => (darkMode ? "#1a1a1b" : "white")};
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${({ $darkmode }) =>
    $darkmode ? "1px solid #262627" : "1px solid #F6F7F8"};
  .icons {
    .icon {
      color: ${({ $darkmode }) => ($darkmode ? "#D7DADC" : "black")};
    }
    @media screen and (max-width: 650px) {
      display: none;
    }
  }
  .wrapper {
    position: relative;
    .community {
      display: flex;
      width: 15vw;
      justify-content: space-between;
      align-items: center;
      color: ${({ $darkmode }) => ($darkmode ? "#D7DADC" : "black")};
      border: ${({ $darkmode }) =>
        $darkmode ? "1px solid black" : "1px solid white"};
      padding: 0.5rem 1rem;
      &:hover {
        border: 1px solid #edeff1;
      }
      cursor: pointer;
      img {
        height: 4vh;
        width: 2vw;
        border-radius: 2vh;
      }
      .info {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
`;

export const Logo = styled(Link)<NavProps>`
  display: flex;
  align-items: center;
  color: ${({ $darkmode }) => ($darkmode ? "white" : "black")};
  text-decoration: none;
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
    color: ${({ $darkmode }) => ($darkmode ? "white" : "gray")};
    border: 1px solid gray;
    width: 40vw;
    background-color: ${({ $darkmode }) =>
      $darkmode ? "#272729" : "lightgray"};
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
  .login,
  .sign-up {
    width: 5rem;
    padding: 0.3rem;
    margin: 0 0.5rem;
    border-radius: 1rem;
    transition: all 0.2s ease-in-out;
    font-weight: bold;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    @media screen and (max-width: 620px) {
      display: none;
    }
  }
  .login {
    background: ${({ $darkmode: darkMode }) =>
      darkMode ? "#030303" : "white"};
    color: ${({ $darkmode: darkMode }) => (darkMode ? "white" : "#1484D6")};
    border: ${({ $darkmode: darkMode }) =>
      darkMode ? "1px solid white" : "1px solid #1484D6 "};
    &:hover {
      background-color: ${({ $darkmode: darkMode }) =>
        darkMode ? "#272729" : "white"};
    }
  }
  .sign-up {
    background: ${({ $darkmode: darkMode }) =>
      darkMode ? "#c8cbcd" : "#1484D6"};
    color: ${({ $darkmode: darkMode }) => (darkMode ? "#101011" : "white")};
    border: ${({ $darkmode: darkMode }) =>
      darkMode ? "1px solid #0e0e0f" : "1px solid #1484D6"};
  }
`;

export const Account = styled.div<NavProps>`
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  width: 12rem;
  margin-right: 1rem;
  border: ${({ $darkmode: darkMode }) =>
    darkMode ? "1px solid #1a1a1b" : "1px solid white"};
  cursor: pointer;
  @media screen and (max-width: 1000px) {
    width: 6rem;
    padding: 0.5rem;
  }
  &:hover {
    border: 1px solid #636366;
  }
  .info {
    display: flex;
    align-items: center;
  }
  .account-icon {
    font-size: 1.5rem;
    color: #818384;
  }
  .name {
    color: #636366;
    padding: 0 0.5rem;
  }
  .logo {
    height: 1.5rem;
    width: 1.5rem;
  }
`;
