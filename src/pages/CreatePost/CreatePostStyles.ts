import styled from "styled-components";

type Props = {
  darkmode: boolean;
  ready: boolean;
};

export const CreatePostComponent = styled.div<Props>`
  min-height: calc(100vh - 50px);
  background-color: ${({ darkmode }) => (darkmode ? "#030303" : "#DAE0E6")};
  color: ${({ darkmode }) => (darkmode ? "#D2D5D7" : "black")};
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: stretch;
  }
  .left {
    @media screen and (max-width: 1000px) {
      margin-bottom: 1rem;
    }
    h1 {
      width: 35rem;
      margin: 1rem 0;
      border-bottom: ${({ darkmode }) =>
        darkmode ? "1px solid #1C1C1D" : "1px solid white"};
      @media screen and (max-width: 1000px) {
        width: 100%;
      }
    }

    .choose-community {
      position: relative;
      cursor: pointer;
      .wrapper {
        width: 20vw;
        background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
        padding: 1rem;
        margin: 1rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media screen and (max-width: 1000px) {
          width: 100%;
          padding: 0.5rem;
          height: 4rem;
        }
      }
      span {
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          height: 2rem;
          width: 2rem;
          border-radius: 2rem;
          object-fit: cover;
        }
      }
    }
    .form {
      display: flex;
      flex-direction: column;
      border: 1px solid #272729;
      background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
      padding: 0.5rem;
      @media screen and (max-width: 1000px) {
        width: 100%;
      }
      .images-display {
        .imageWrapper {
          display: flex;
          gap: 10px;
          .image-remove {
            color: tomato;
            cursor: pointer;
          }
        }
      }
    }
  }
  .right {
    margin: 0 1rem;
    .rules {
      padding: 1rem;
      background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
      width: fit-content;

      ul {
        li {
          list-style: inside;
          list-style-type: decimal;
          border-bottom: ${({ darkmode }) =>
            darkmode ? "1px solid #818384" : "1px solid #7C7C7C"};
          margin: 0.5rem 0;
          padding: 0.5rem 0;
        }
      }
    }
    span,
    p {
      font-size: 0.7rem;
      color: ${({ darkmode }) => (darkmode ? "#818384" : "#7C7C7C")};
    }
  }
`;
