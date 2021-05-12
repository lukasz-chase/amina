import styled from "styled-components";

interface PostProps {
  darkmode: boolean;
}
interface CommentProps {
  darkmode: boolean;
  comment: boolean;
  ready: boolean;
}
export const Wrapper = styled.div<PostProps>`
  background-color: ${({ darkmode }) => (darkmode ? "black" : "#dae0e6")};
  min-height: 95vh;
  .save {
    display: flex;
    align-items: center;
    margin: 1rem;
    cursor: pointer;
  }
  .icon {
    margin: 1rem;
  }
  padding-bottom: 2rem;
`;
export const Header = styled.div<PostProps>`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 2.5rem;
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
      padding-left: 0;
    }
    .upvotes {
      @media screen and (max-width: 1000px) {
        display: none;
      }
    }
    .post {
      width: 100%;
      .upvotes-sm {
        height: 2rem;
        position: relative;
        display: none;
        @media screen and (max-width: 1000px) {
          display: flex;
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
              text-decoration: none;
              color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
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
            @media screen and (max-width: 1000px) {
              padding: 0;
            }
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
          padding: 0.5rem;
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
        .post-title {
          margin-bottom: 1rem;
          font-size: 1.7rem;
        }
        span {
          width: 40vw;
          font-size: 1.5rem;
          margin: 1rem 0;
          @media screen and (max-width: 1000px) {
            width: 100%;
            font-size: 1.5rem;
          }
        }
        .delete-button {
          font-size: 1rem;
          cursor: pointer;
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
        @media screen and (max-width: 1000px) {
          width: 60%;
        }
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
    .edit-comment {
      display: flex;
      flex-direction: column;
      .edit-comment-field {
      }
      .MuiInputBase-input {
        padding: 0.5rem;
        background-color: ${({ darkmode }) => (darkmode ? "black" : "white")};
        color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
      }
      .edit-comment-button {
        padding: 0.5rem;
        cursor: ${({ ready }) => (ready ? "pointer" : "no-drop")};
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
      height: 2rem;
      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2rem;
        cursor: pointer;
        margin: 0 0.5rem;
        padding: 0.2rem;
        font-size: 0.8rem;
        text-align: center;
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
