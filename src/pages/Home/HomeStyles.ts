import styled from "styled-components";

type homeProps = {
  darkmode: boolean;
  classicview: boolean;
};

export const HomeComponent = styled.div<homeProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: ${({ darkmode }) => (darkmode ? "#030303" : "#DAE0E6")};
`;

export const Posts = styled.div<homeProps>`
  min-height: 100vh;
  width: ${({ classicview }) => (classicview ? "70vw" : "65vw")};
  @media screen and (max-width: 1100px) {
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  .post-wrapper {
    width: ${({ classicview }) => (classicview ? "130vh" : "90vh")};
    justify-self: flex-end;
    align-self: flex-end;
    @media screen and (max-width: 1100px) {
      width: 100%;
    }
  }
`;

export const Info = styled.div<homeProps>`
  width: ${({ classicview }) => (classicview ? "30%" : "40%")};
  margin-top: 2rem;
  margin-left: 2rem;
  height: fit-content;
  border-radius: 5px;
  .trending {
    border: 1px solid #474748;
    background: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
    width: 20vw;
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
  .popular {
    width: 20vw;
    background: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
    display: flex;
    flex-direction: column;
    h2 {
      color: ${({ darkmode }) => (darkmode ? "white" : "black")};
      font-size: 1rem;
      text-align: center;
      padding: 1rem;
    }
    .post {
      width: 20vw;
      display: flex;
      font-size: 0.8rem;
      padding: 0.5rem;
      text-decoration: none;
      img {
        height: 7vh;
        width: 5vw;
        object-fit: cover;
      }
      .info {
        color: ${({ darkmode }) => (darkmode ? "white" : "black")};
        display: flex;
        flex-direction: column;
        width: 20vw;
        margin-left: 1vw;
        .title {
          width: 13vw;
          word-wrap: break-word;
        }
        .upvotes {
        }
      }
    }
  }
  .create {
    display: flex;
    flex-direction: column;
    width: 20vw;
    margin: 1rem 0;
    border: 1px solid #474748;
    background: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
    color: ${({ darkmode }) => (darkmode ? "#B3B5B7" : "black")};
    border-radius: 5px;
    .bg {
      border-radius: 5px 5px 0 0;
      background-color: ${({ darkmode }) => (darkmode ? "#C8CBCD" : "#33A8FF")};
      height: 2rem;
    }
    h1 {
      font-size: 1rem;
      padding: 0.5rem;
    }
    span {
      font-size: 1rem;
      padding: 0 0.5rem;
    }
    .link {
      align-self: center;
      text-decoration: none;
      width: 90%;
      .post,
      .subamin {
        cursor: pointer;
        background: ${({ darkmode }) => (darkmode ? "#C8CBCD" : "#1484D6")};
        color: ${({ darkmode }) => (darkmode ? "black" : "white")};
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        padding: 0.3rem 0.5rem;
        border-radius: 5rem;
        margin: 0.5rem 0;
      }
      .subamin {
        background: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
        color: ${({ darkmode }) => (darkmode ? "#D7DADC" : "#1484D6")};
        border: ${({ darkmode }) =>
          darkmode ? "1px solid #d7dadc" : "1px solid #1484D6"};
      }
    }
  }
  @media screen and (max-width: 1100px) {
    display: none;
  }
`;
