import styled from "styled-components";

export const Nav = styled.nav`
  background: #1a1a1b;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  color: white;
  h1 {
    margin-left: 5px;
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
export const TextInput = styled.div`
  .textField {
    color: White;
    border: 1px solid gray;
    width: 40vw;
    background-color: #272729;
    border-radius: 5px;
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
export const Buttons = styled.div`
  display: flex;
  align-items: center;
  button {
    width: 7rem;
    padding: 0.5rem;
    margin: 0 0.5rem;
    border-radius: 1rem;
    transition: all 0.2s ease-in-out;
    font-weight: bold;
  }
  .login {
    background: #000000;
    color: white;
    border: 1px solid white;
    cursor: pointer;
    &:hover {
      background-color: #272729;
    }
    @media screen and (max-width: 620px) {
      display: none;
    }
  }
  .sign-up {
    background: #c8cbcd;
    color: #101011;
    border: 1px solid #0e0e0f;
    cursor: pointer;
    &:hover {
      background-color: #a9abac;
    }
    @media screen and (max-width: 620px) {
      display: none;
    }
  }
`;

export const Account = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  margin-right: 1rem;
  border: 1px solid #1a1a1b;
  cursor: pointer;
  &:hover {
    border: 1px solid #636366;
  }
  .account-icon {
    font-size: 1.5rem;
    color: #818384;
  }
`;
