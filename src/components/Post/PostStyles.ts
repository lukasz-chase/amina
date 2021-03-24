import styled from "styled-components";

interface PostProps {
  darkMode: boolean;
}

export const PostComponent = styled.div<PostProps>`
  display: flex;
  width: 100%;
  margin: 1rem 0;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s ease-in-out;
  &:hover {
    border: 1px solid #9c9c9c;
  }
  .upvotes {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5rem;
    flex-direction: column;
    background: ${({ darkMode }) => (darkMode ? "#242425" : "#F8F9FA")};
    color: ${({ darkMode }) => (darkMode ? "#d2d5d7" : "gray")};
    @media screen and (max-width: 1000px) {
      display: none;
    }
    span {
      font-weight: bold;
      color: ${({ darkMode }) => (darkMode ? "#d2d5d7" : "black")};
    }
    .upvote-button,
    .downvote-button {
      cursor: pointer;
      &:hover {
        background: ${({ darkMode }) => (darkMode ? "#2A2A2B" : "#e1e2e3")};
      }
    }
    .upvote-button {
      &:hover {
        color: #cc3700;
      }
    }
    .downvote-button {
      &:hover {
        color: #5a75cc;
      }
    }
  }
  .view {
    background: ${({ darkMode }) => (darkMode ? "#1A1A1B" : "#F3F3F3")};
    padding: 0.5rem 0.5rem 0 0.5rem;
    @media screen and (max-width: 1000px) {
      padding: 0;
    }
    .post-header {
      display: flex;
      flex-direction: column;
      /* order: 2; */
      .header-info {
        display: flex;
        /* flex-direction: column; */
        justify-content: space-between;
        span {
          margin: 0 5px;
          color: ${({ darkMode }) => (darkMode ? "#818384" : "#1484D6")};
          font-size: 10px;
        }
        .name {
          font-size: 15px;
          font-weight: bold;
          color: ${({ darkMode }) => (darkMode ? "#D7DADC" : "black")};
        }
      }
      .join {
        .join-button {
          outline: none;
          border: none;
          border-radius: 15px;
          background: ${({ darkMode }) => (darkMode ? "#C8CBCD" : "#1484D6")};
          color: ${({ darkMode }) => (darkMode ? "black" : "white")};
          padding: 0.2rem;
          font-weight: bold;
          width: 4rem;
          cursor: pointer;
        }
      }
    }
    .post-title {
      /* order: 2; */
      font-size: 1.5rem;
      padding: 4px 0;
      color: ${({ darkMode }) => (darkMode ? "#D4D7D9" : "black")};
    }
    .post-image {
      /* order: 1; */
      width: 100%;
      img {
        width: 100%;
        min-height: 25vw;
        max-height: 35vw;
        object-fit: cover;
        @media screen and (max-width: 1000px) {
          height: 50vh;
        }
      }
    }
    .post-tools {
      order: 3;
      display: flex;
      button {
        outline: none;
        border: none;
        padding: 0.4rem;
        display: flex;
        align-items: center;
        color: ${({ darkMode }) => (darkMode ? "#818384" : "#878a8c")};
        font-weight: bold;
        cursor: pointer;
        background: transparent;
        &:hover {
          background: ${({ darkMode }) => (darkMode ? "#2D2D2E" : "#e8e8e8")};
        }
        .icon {
          margin: 0 5px;
        }
      }
      .upvotes {
        display: none;
        @media screen and (max-width: 1000px) {
          display: flex;
          flex-direction: row;
          background: transparent;
          span {
            margin: 0 5px;
          }
          .downvote-button,
          .upvote-button {
            font-size: 1.3rem;
          }
        }
      }
    }
  }
`;
