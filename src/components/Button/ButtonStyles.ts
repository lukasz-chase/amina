import styled from "styled-components";

interface ButtonProps {
  darkmode: boolean;
  size?: string;
  disabled?: boolean;
  type: string;
}

export const ButtonWrapper = styled.div<ButtonProps>`
  margin: 1rem 0;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background-color: ${({ darkmode }) => (darkmode ? "#272729" : "#0079d3")};
  color: ${({ darkmode }) => (darkmode ? "#B4B7B9" : "white")};
  padding: 0.5rem;
  border-radius: 5rem;
  border: none;
`;
