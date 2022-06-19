import styled from "styled-components";

interface PostProps {
  darkmode: boolean;
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
  span {
    font-size: 1rem;
  }
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
          color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
          font-size: 1rem;
          cursor: pointer;
          text-decoration: none;
          display: flex;
          align-items: center;
          @media screen and (max-width: 1000px) {
            padding: 10px;
          }
        }
      }
    }
  }
`;
