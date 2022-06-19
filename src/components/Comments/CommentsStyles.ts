import styled from "styled-components";

interface CommentProps {
  darkmode: boolean;
  comment: boolean;
  ready: boolean;
}

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
