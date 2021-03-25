import styled from "styled-components";

interface PostProps {
  darkMode: boolean;
  classicView: boolean;
  compactView: boolean;
}

export const PostComponent = styled.div<PostProps>`
  display: flex;
  max-width: 100%;
  margin: ${({classicView}) => (classicView ? '0' : '1rem 0')};
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s ease-in-out;
  &:hover {
    border: 1px solid #9c9c9c;
  }
  .upvotes {
    display: flex;
    justify-content: ${({classicView}) => (classicView ? 'center' : 'flex-start')};
    align-items: center;
    padding: 0.5rem;
    flex-direction: ${({compactView}) => (compactView ? 'row' : 'column')};
    background: ${({ darkMode }) => (darkMode ? "#242425" : "#F8F9FA")};
    color: ${({ darkMode }) => (darkMode ? "#d2d5d7" : "gray")};
    @media screen and (max-width: 1000px) {
    display: ${({classicView}) => (classicView ? 'flex' : 'none')};;
    flex-direction: ${({compactView}) => (compactView ? 'row' : 'column')};
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
    width:100%;
    display:flex;
    flex-direction: ${({classicView}) => (classicView ? 'row' : 'column')};
    padding:${({compactView}) => (compactView ? '0' : '0.5rem 0.5rem 0 0.5rem')} ;
    @media screen and (max-width: 1000px) {
      padding: 0;
    }
    .post-header {
      display: flex;
      flex-direction: column;
      order: ${({ classicView }) => (classicView ? "2" : "1")};
      .header-info {
        display: flex;
        align-items:center;
        justify-content: ${({classicView}) => (classicView ? 'flex-start' : 'space-between')};    
        order: ${({ classicView }) => (classicView ? "2" : "1")};
        span {
          margin: 0 5px;
          color: ${({ darkMode }) => (darkMode ? "#818384" : "#1484D6")};
          font-size: 10px;
        }
        .name {
          font-size: ${({classicView}) => (classicView ? '10px' : '15px')};
          font-weight: bold;
          color: ${({ darkMode }) => (darkMode ? "#D7DADC" : "black")};
        }
      }
      .join {
        .join-button {
          display:flex;
          align-items:center;
          justify-content:center;
          outline: none;
          border: none;
          border-radius: ${({classicView}) => (classicView ? '10px' : '15px')};;
          background: ${({ darkMode }) => (darkMode ? "#C8CBCD" : "#1484D6")};
          color: ${({ darkMode }) => (darkMode ? "black" : "white")};
          padding: ${({classicView}) => (classicView ? '0.1rem' : '0.2rem')};;
          font-weight: bold;
          width: ${({classicView}) => (classicView ? '1rem' : '4rem')};
          cursor: pointer;
          span{
          font-weight: bold;
          color: ${({ darkMode }) => (darkMode ? "black" : "white")};
          display: ${({classicView}) => (classicView ? 'none' : 'flex')}
          }
        }
      }
      .post-tools{
          display:${({ classicView, compactView }) => (classicView && !compactView ? "flex" : "none")};
        }
    }
    .post-title {
      width:${({ classicView }) => (classicView ? "50rem" : "30rem")};
      word-wrap: break-word;
      order: ${({ classicView }) => (classicView ? "1" : "2")};
      font-size: ${({classicView}) => (classicView ? '1rem' : '1.5rem')};
      padding: 4px 4px;
      color: ${({ darkMode }) => (darkMode ? "#D4D7D9" : "black")};
      @media screen and (max-width:1000px){
      width:16rem;
      }
    }
    .post-image {
      order: ${({ classicView }) => (classicView ? "1" : "2")};
      width:  ${({classicView}) => (classicView ? '16vw' : '100%')};
      display:${({compactView}) => (compactView ? 'none' : 'flex')};
      img {
        width:  ${({classicView}) => (classicView ? '16vw' : '100%')};
        min-height:  ${({classicView}) => (classicView ? '5vw' : '25vw')};
        max-height: ${({classicView}) => (classicView ? '5vw' : '35vw')};
        object-fit: cover;
        @media screen and (max-width: 1000px) {
          min-height:  ${({classicView}) => (classicView ? '19vw' : '25vw')};
        max-height: ${({classicView}) => (classicView ? '19vw' : '35vw')};
        }
      }
    }
    .post-tools {
      order: 3;
      display: ${({ classicView }) => (classicView ? "none" : "flex")};
      button {
        outline: none;
        border: none;
        padding: ${({ classicView }) => (classicView ? "0.2rem" : "0.4rem")};
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
