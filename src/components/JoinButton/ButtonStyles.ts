import styled from "styled-components";

interface ButtonProps {
  $darkmode: boolean;
  $classicview: boolean;
  $compactview: boolean;
}

export const Button = styled.div<ButtonProps>`
  .join-button {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    outline: none;
    border: none;
    border-radius: ${({ $classicview: classicView }) =>
      classicView ? "10px" : "15px"};
    background: ${({ $darkmode: darkMode }) =>
      darkMode ? "#C8CBCD" : "#1484D6"};
    color: ${({ $darkmode: darkMode }) => (darkMode ? "black" : "white")};
    padding: ${({ $classicview: classicView }) =>
      classicView ? "0.1rem" : "0.2rem"};
    font-weight: bold;
    width: ${({ $classicview: classicView }) =>
      classicView ? "1rem" : "4rem"};
    cursor: pointer;
    span {
      font-weight: bold;
      color: ${({ $darkmode: darkMode }) => (darkMode ? "black" : "white")};
      display: ${({ $classicview: classicView }) =>
        classicView ? "none" : "flex"};
    }
  }
`;