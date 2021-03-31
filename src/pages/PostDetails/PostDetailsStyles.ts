import styled from "styled-components";

interface PostProps {
  darkmode: boolean;
}

export const Header = styled.div<PostProps>`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 3rem;
  background-color: ${({ darkmode }) => (darkmode ? "black" : "#dae0e6")};
  color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
  .wrapper {
    background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 55vw;
    .icon {
      cursor: pointer;
    }
  }
`;

export const DetailsComponent = styled.div<PostProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ darkmode }) => (darkmode ? "black" : "#dae0e6")};
  .post-wrapper {
    width: 55vw;
    background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
    display: flex;
    color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
    .post {
      .post-info {
        display: flex;
        align-items: center;
        background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
        .logo {
          img {
            height: 3rem;
            width: 3rem;
            border-radius: 3rem;
          }
        }
        .details {
          display: flex;
          @media screen and (max-width: 1000px) {
            flex-direction: column;
          }
          color: #a6a9aa;
          span {
            .user {
              &:hover {
                cursor: pointer;
                text-decoration: underline;
              }
            }
          }
          .subamin-name {
            color: gray;
            padding: 0 0.5rem;
            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
      }
      .post-details {
        display: flex;
        flex-direction: column;
        word-wrap: break-word;
        img {
          height: 30vw;
          width: 45vw;
          object-fit: cover;
        }
        span {
          width: 40vw;
          font-size: 2rem;
        }
      }
    }
  }
`;
export const CommentsComponent = styled.div<PostProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ darkmode }) => (darkmode ? "black" : "#dae0e6")};
  .sort-comments {
    display: flex;
    align-items: center;
    width: 55vw;
    background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
    padding: 1rem;
    color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
    span {
      padding: 0.2rem;
      margin: 0 0.3rem;
      cursor: pointer;
      &:hover {
        background-color: ${({ darkmode }) =>
          darkmode ? "#2D2D2E" : "#E8E8E8"};
      }
    }
  }
  .comment {
    padding: 1rem;
    background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
    width: 55vw;
    color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
    .header {
      font-size: 1rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        margin-right: 0.5rem;
        font-size: 0.8rem;
      }
      .time {
        color: gray;
      }
      .name {
        font-size: 1rem;
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    .tool-box {
      display: flex;
      align-items: center;
      color: #878a8c;
      font-weight: bold;
      span {
        font-size: 0.8rem;
        padding: 0.2rem;
      }
      .button {
        cursor: pointer;
        &:hover {
          background-color: ${({ darkmode }) =>
            darkmode ? "#2D2D2E" : "#E8E8E8"};
        }
      }
    }
    .comment-text {
      padding: 0.5rem 0;
    }
  }
`;
