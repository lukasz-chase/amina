import styled from "styled-components";

interface upvoteProps {
  darkmode: boolean;
  classicview: boolean;
  flexdirection: string;
  darkmodebg: string;
}

export const UpvoteComponent = styled.div<upvoteProps>`
  display: flex;
  justify-content: ${({ classicview }) =>
    classicview ? "center" : "flex-start"};
  align-items: center;
  padding: 0.5rem;
  flex-direction: ${({ flexdirection }) => flexdirection};
  background: ${({ darkmode, darkmodebg }) =>
    darkmode ? darkmodebg : "#F8F9FA"};
  color: ${({ darkmode }) => (darkmode ? "#d2d5d7" : "gray")};
  @media screen and (max-width: 1000px) {
    display: ${({ classicview }) => (classicview ? "flex" : "none")};
  }
  span {
    font-weight: bold;
    color: ${({ darkmode }) => (darkmode ? "#d2d5d7" : "black")};
  }
  .upvote-button,
  .downvote-button {
    cursor: pointer;
    &:hover {
      background: ${({ darkmode }) => (darkmode ? "#2A2A2B" : "#e1e2e3")};
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
`;
