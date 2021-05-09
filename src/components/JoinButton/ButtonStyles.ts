import styled from "styled-components";

interface ButtonProps {
  $darkmode: boolean;
  $classicview: boolean;
  $compactview: boolean;
  $islogged: boolean;
  $isjoined: boolean;
}

export const Button = styled.button<ButtonProps>`
  position: absolute;
  right: 0;
  top: 0;
  margin: 1rem;
  display: ${({ $islogged }) => ($islogged ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  z-index: 5;
  border-radius: ${({ $classicview: classicView }) =>
    classicView ? "10px" : "15px"};
  background: ${({ $darkmode: darkMode }) =>
    darkMode ? "#C8CBCD" : "#1484D6"};
  color: ${({ $darkmode: darkMode }) => (darkMode ? "black" : "white")};
  padding: ${({ $classicview: classicView }) =>
    classicView ? "0.1rem" : "0.2rem"};
  font-weight: bold;
  width: 4rem;
  cursor: pointer;
  span {
    font-weight: bold;
    color: ${({ $darkmode: darkMode }) => (darkMode ? "black" : "white")};
    display: ${({ $classicview: classicView }) =>
      classicView ? "none" : "flex"};
  }
  &::after {
    content: "${({ $isjoined }) => ($isjoined ? "joined" : "join")}";
  }
  &:hover {
    &::after {
      content: "${({ $isjoined }) => ($isjoined ? "leave" : "join")}";
    }
  }
`;
