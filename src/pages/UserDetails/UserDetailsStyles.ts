import styled from "styled-components";

type Props = {
  darkmode: boolean;
  classicview: boolean;
};

export const UserDetailsComponent = styled.div<Props>`
  background-color: ${({ darkmode }) => (darkmode ? "black" : "#dae0e6")};
  display: flex;
  justify-content: space-evenly;
  min-height: 93vh;
  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }
  .left {
    width: ${({ classicview }) => (classicview ? "62vw" : "50vw")};
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 1100px) {
      width: 100%;
      order: 2;
    }
    .posts {
      width: ${({ classicview }) => (classicview ? "62vw" : "50vw")};
      align-self: flex-end;
      @media screen and (max-width: 1100px) {
        width: 100%;
      }
    }
    .empty {
      font-size: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${({ darkmode }) => (darkmode ? "#D7DADC" : "black")};
      @media screen and (max-width: 1100px) {
        width: 100%;
        order: 2;
      }
    }
    .settings {
      margin-top: 3rem;
      border-radius: 10px;
      background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
      display: flex;
      flex-direction: column;
      padding: 0.5rem;
      @media screen and (max-width: 1100px) {
        width: 100%;
        order: 2;
      }
      .line {
        height: 1px;
        margin: 0.5rem 0;
        width: 90%;
        background-color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
      }
      span {
        margin: 0.5rem 0;
        color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
      }
      .MuiInputBase-input {
        padding: 0.5rem;
        background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
        color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
      }
      .input {
        border: ${({ darkmode }) =>
          darkmode ? "1px solid #343536" : "1px solid black"};
        padding: 0.5rem;
        margin-bottom: 0.5rem;
      }
      .submit {
        padding: 0.5rem;
        width: 20%;
        background: ${({ darkmode }) => (darkmode ? "#C8CBCD" : "#1484D6")};
        color: ${({ darkmode }) => (darkmode ? "black" : "white")};
        border-radius: 5rem;
        margin: 0.5rem 0;
        align-self: flex-end;
        text-align: center;
      }
    }
  }
  .right {
    width: 30vw;
    @media screen and (max-width: 1100px) {
      width: 100%;
      order: 1;
    }
    .user-info {
      position: relative;
      margin-top: 3rem;
      background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
      width: 50vh;
      border-radius: 5px;
      @media screen and (max-width: 1100px) {
        width: 100%;
      }
      .header {
        border-radius: 5px 5px 0px 0px;
        background-color: ${({ darkmode }) =>
          darkmode ? "#C8CBCD" : "#33A8FF"};
        height: 4rem;
      }
      .article {
        position: relative;
        color: ${({ darkmode }) => (darkmode ? "#D7DADC" : "black")};
        height: 16rem;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        span {
          margin: 0.3rem 0;
        }
        p {
          font-size: 0.7rem;
          color: rgb(147, 147, 147);
          .cake-icon {
            color: rgb(36, 160, 237);
          }
        }
        .saved-posts {
          text-decoration: none;
          color: ${({ darkmode }) => (darkmode ? "#D7DADC" : "black")};
          margin: 0.5rem 0;
          width: fit-content;
          &:hover {
            background-color: ${({ darkmode }) =>
              darkmode ? "#2D2D2E" : "#E8E8E8"};
          }
        }
        .new-post {
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
        .user-settings {
          position: absolute;
          top: 0;
          right: 0;
          margin: 1rem;
          font-size: 1.5rem;
          cursor: pointer;
          color: ${({ darkmode }) => (darkmode ? "#D7DADC" : "#0079D3")};
        }
      }
      .logo {
        border-radius: 10px;
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(30%, 20%);
        height: 5rem;
        width: 5rem;
        object-fit: cover;
      }
    }
    .user-subamins {
      display: flex;
      flex-direction: column;
      background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
      width: 50vh;
      border-radius: 5px;
      margin: 1rem 0;
      span {
        color: ${({ darkmode }) => (darkmode ? "#7C7E7F" : "black")};
      }
      .moderator {
        padding: 1rem;
      }
    }
  }
`;
