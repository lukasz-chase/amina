import styled from "styled-components";

type headerProps = {
  darkmode: boolean;
};
type viewHeight = {
  darkMode: boolean;
  height: string;
  mobileHeight: string;
};

export const HeaderComponent = styled.div<headerProps>`
  background: ${({ darkmode: darkMode }) => (darkMode ? "#1A1A1B" : "white")};
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  height: 4rem;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #474748;
  .view {
    display: flex;
    position: relative;
    .options {
      background: ${({ darkmode: darkMode }) =>
        darkMode ? "#1A1A1B" : "white"};
      position: absolute;
      display: flex;
      flex-direction: column;
      z-index: 20;
      margin-top: 2rem;
      @media screen and (max-width: 1000px) {
        transform: translate(-50%, 0%);
      }
    }
  }
  .buttons {
    display: flex;
  }
`;

export const Button = styled.button<headerProps>`
  padding: 0.5rem;
  border: none;
  outline: none;
  color: ${({ darkmode: darkMode }) => (darkMode ? "#888A8B" : "#7E8183")};
  border-radius: 1rem;
  width: 7rem;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: ${({ darkmode: darkMode }) =>
      darkMode ? "#29292a" : "#EDEDED"};
  }
  @media screen and (max-width: 1200px) {
    width: 5rem;
    margin: 0 0rem;
    font-size: 1rem;
  }
  .wrapper {
    display: flex;
    align-items: center;

    .button-icon {
      margin-right: 10px;
    }
  }
  .active {
    color: ${({ darkmode }) => (darkmode ? "#D7DADC" : "#0079D3")}!important;
  }
`;

export const ViewOption = styled.div<viewHeight>`
  color: ${({ darkMode }) => (darkMode ? "#888A8B" : "#7E8183")};
  padding: 0.5rem;
  display: flex;
  align-items: center;
  border-radius: 1rem;
  cursor: pointer;
  @media screen and (max-width: 1260px) {
    font-size: 0.8rem;
    flex-direction: column;
  }
  &:hover {
    background: ${({ darkMode }) => (darkMode ? "#29292a" : "#EDEDED")};
  }

  .lines {
    margin-right: 5px;
    .active {
      background: ${({ darkMode }) =>
        darkMode ? "#D7DADC" : "#0079D3"}!important;
    }
    .line {
      height: ${({ height }) => height};
      margin: 2px 0;
      width: 20px;
      background: ${({ darkMode }) => (darkMode ? "#888A8B" : "#7E8183")};
      display: flex;
      flex-direction: column;
      @media screen and (max-width: 1200px) {
        height: ${({ mobileHeight }) => mobileHeight};
      }
    }
  }
`;
