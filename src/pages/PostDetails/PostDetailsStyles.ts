import styled from "styled-components";

interface PostProps {
  darkmode: boolean;
}
interface CommentProps {
  darkmode: boolean;
  comment: boolean;
}
export const Wrapper = styled.div<PostProps>`
  background-color: ${({ darkmode }) => (darkmode ? "black" : "#dae0e6")};
  min-height: 93vh;
`;
export const Header = styled.div<PostProps>`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 3rem;
  padding-top: 2rem;
  background-color: ${({ darkmode }) => (darkmode ? "black" : "#dae0e6")};
  color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
  @media screen and (max-width: 1000px) {
    padding-top: 0;
  }
  .wrapper {
    background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 55vw;
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
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
    position: relative;
    padding-left: 60px;
    width: 55vw;
    background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
    display: flex;
    color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
    .post {
      .upvotes-sm {
        color: ${({ darkmode }) => (darkmode ? "#636366" : "black")};
        display: none;
        padding: 0.5rem;
        @media screen and (max-width: 1000px) {
          display: flex;
          flex-direction: row;
          background: transparent;
          span {
            margin: 0 5px;
          }
          .downvote-button,
          .upvote-button {
            font-size: 1.5rem;
          }
        }
      }
      .post-info {
        display: flex;
        align-items: center;
        background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
        @media screen and (max-width: 1000px) {
          justify-content: space-evenly;
          width: 100%;
        }
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
            text-decoration: none;
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
        @media screen and (max-width: 1000px) {
          justify-content: center;
          align-items: center;
        }
        img {
          height: 30vw;
          width: 45vw;
          object-fit: cover;
          @media screen and (max-width: 1000px) {
            width: 100%;
            height: 60vw;
            margin: 1rem 0;
          }
        }
        span {
          width: 40vw;
          font-size: 2rem;
          @media screen and (max-width: 1000px) {
            width: 100%;
            font-size: 1.5rem;
          }
        }
      }
    }
  }
`;
export const CommentsComponent = styled.div<CommentProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ darkmode }) => (darkmode ? "black" : "#dae0e6")};
  .write-comment {
    background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
    width: 55vw;
    color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
    .form {
      display: flex;
      flex-direction: column;
      .MuiInputBase-input {
        color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
        padding: 0.5rem;
      }
      .text-field {
        width: 51vw;
        border: 1px solid gray;
        font-family: "Noto Sans", sans-serif;
        @media screen and (max-width: 1000px) {
          width: 90vw;
        }
        &:hover {
          border: 1px solid #d7dadc;
        }
        &:focus {
          border: 1px solid #d7dadc;
        }
      }
      .submit {
        pointer-events: ${({ comment }) => (comment ? "all" : "none")};
        padding: 0.5rem;
        cursor: pointer;
        width: 20%;
        background: ${({ darkmode }) => (darkmode ? "#C8CBCD" : "#1484D6")};
        color: ${({ darkmode }) => (darkmode ? "black" : "white")};
        outline: none;
        border: none;
        border-radius: 5rem;
        margin: 0.5rem 0;
        align-self: flex-end;
      }
    }
  }
  .sort-comments {
    display: flex;
    background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
    align-items: center;
    width: 55vw;
    padding: 1rem;
    color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
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
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
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
      padding-left: 80px;
      color: #878a8c;
      font-weight: bold;
      position: relative;
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
