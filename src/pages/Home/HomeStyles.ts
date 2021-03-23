import styled from "styled-components";

type homeProps = {
  darkMode: boolean;
};

export const HomeComponent = styled.div<homeProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  background: ${({ darkMode }) => (darkMode ? "#030303" : "#DAE0E6")};
`;

export const Posts = styled.div<homeProps>`
  min-height: 100vh;
  width: 45%;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

export const Info = styled.div<homeProps>`
  background: ${({ darkMode }) => (darkMode ? "#1A1A1B" : "white")};
  width: 20%;
  margin-top: 2rem;
  margin-left: 2rem;
  height: 29rem;
  border-radius: 5px;
  .trending {
    h2 {
      color: ${({ darkMode }) => (darkMode ? "white" : "black")};
      font-size: 1rem;
      text-align: center;
      padding: 1rem;
    }
    .subamina {
      padding: 1rem 0;
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      color: ${({ darkMode }) => (darkMode ? "white" : "black")};
      border-bottom: ${({ darkMode }) =>
        darkMode ? "1px solid #818384" : "1px solid #1A1A1B"};
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
