import styled from "styled-components";

type homeProps = {
  darkmode: boolean;
  classicview: boolean;
};

export const HomeComponent = styled.div<homeProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  background: ${({ darkmode }) => (darkmode ? "#030303" : "#DAE0E6")};
`;

export const Posts = styled.div<homeProps>`
  min-height: 100vh;
  width: ${({ classicview }) => (classicview ? "70%" : "40%")};
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

export const Info = styled.div<homeProps>`
  background: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
  margin-top: 2rem;
  margin-left: 2rem;
  height: fit-content;
  border-radius: 5px;
  .trending {
    h2 {
      color: ${({ darkmode }) => (darkmode ? "white" : "black")};
      font-size: 1rem;
      text-align: center;
      padding: 1rem;
    }
    .subamina {
      text-decoration: none;
      padding: 1rem 0;
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      color: ${({ darkmode }) => (darkmode ? "white" : "black")};
      border-bottom: ${({ darkmode }) =>
        darkmode ? "1px solid #818384" : "1px solid #1A1A1B"};
      .logo {
        height: 5vh;
        width: 5vh;
        border-radius: 25px;
        object-fit: cover;
      }
      span {
        padding: 0 15px;
      }
    }
  }
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
