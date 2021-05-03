import styled from "styled-components";

type ButtonProps = {
  darkmode: boolean;
};

export const ButtonComponent = styled.button<ButtonProps>`
  background-color: ${({ darkmode }) => (darkmode ? "#D7DADC" : "#0079D3")};
  color: ${({ darkmode }) => (darkmode ? "black" : "white")};
  position: fixed;
  right: 0;
  bottom: 0;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  outline: none;
  border: none;
  margin: 1rem;
  cursor: pointer;
  @media screen and (max-width: 1300px) {
    display: none;
  }
`;
