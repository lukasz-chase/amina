import styled from "styled-components";

interface upvoteProps {
  darkmode: boolean;
  classicview: boolean;
  flexdirection: string;
  darkmodebg: string;
  whitemodebg: string;
  upvoted: boolean;
  downvoted: boolean;
  compactview: boolean;
}

export const UpvoteComponent = styled.div<upvoteProps>`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 40px;
  display: flex;
  justify-content: ${({ classicview }) =>
    classicview ? "center" : "flex-start"};
  align-items: center;
  padding: ${({ compactview }) => (compactview ? "0.2rem" : "0.5rem")};
  flex-direction: ${({ flexdirection }) => flexdirection};
  background: ${({ darkmode, darkmodebg, whitemodebg }) =>
    darkmode ? darkmodebg : whitemodebg};
  color: ${({ darkmode }) => (darkmode ? "#d2d5d7" : "gray")};
  @media screen and (max-width: 1000px) {
    display: ${({ classicview }) => (classicview ? "flex" : "none")};
  }
  span {
    font-weight: bold;
    font-size: ${({ compactview }) => (compactview ? "0.8rem" : "1rem")};
    color: ${({ darkmode }) => (darkmode ? "#d2d5d7" : "black")};
  }
  .upvote-button,
  .downvote-button {
    font-size: ${({ compactview }) => (compactview ? "1rem" : "1.5rem")};
    cursor: pointer;
    &:hover {
      background: ${({ darkmode }) => (darkmode ? "#2A2A2B" : "#e1e2e3")};
    }
  }
  .upvote-button {
    color: ${({ upvoted }) => (upvoted ? "#cc3700" : "gray")};
    &:hover {
      color: #cc3700;
    }
  }
  .downvote-button {
    color: ${({ downvoted }) => (downvoted ? "#5a75cc" : "gray")};
    &:hover {
      color: #5a75cc;
    }
  }
`;
