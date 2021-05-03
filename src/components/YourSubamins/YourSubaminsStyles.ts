import styled from "styled-components";
import { Link } from "react-router-dom";

type DropdownProps = {
  darkmode: boolean;
  open: boolean;
};

export const SubaminsDropdown = styled.div<DropdownProps>`
  z-index: 10;
  background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
  color: black;
  display: ${({ open }) => (open ? "flex" : "none")};
  position: absolute;
  top: 0;
  margin-top: 46px;
  flex-direction: column;
  width: 15vw;
  left: 0;
  max-height: 15rem;
  overflow: auto;
  .text-input {
    align-self: center;
    margin: 0.5rem 0;
    .textField {
      height: 2rem;
      color: ${({ darkmode }) => (darkmode ? "white" : "gray")};
      padding: 0.5rem;
      border: 1px solid gray;
    }
  }
  span {
    color: ${({ darkmode }) => (darkmode ? "#818384" : "black")};
    font-size: 0.6rem;
    padding: 0.2rem 1rem;
  }
`;
export const Community = styled(Link)<DropdownProps>`
  display: flex;
  align-items: center;
  padding: 0.4rem 1rem;
  text-decoration: none;
  color: ${({ darkmode }) => (darkmode ? "#D7DADC" : "black")};
  &:hover {
    background-color: ${({ darkmode }) => (darkmode ? "#272729" : "black")};
  }
  .community-icon {
    margin-right: 0.3rem;
  }
  img {
    margin-right: 0.3rem;
    height: 4vh;
    width: 4vh;
    border-radius: 2vh;
  }
`;
