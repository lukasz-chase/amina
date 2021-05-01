import styled from "styled-components";

interface DetailsProps {
  bgimage: string;
  darkmode: boolean;
  classicview: boolean;
}

export const DetailsComponent = styled.div<DetailsProps>`
  .header {
    width: 100%;
    .subamin-bg {
      height: 10vw;
      background-image: ${({ bgimage }) => `url(${bgimage})`};
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      @media screen and (max-width: 1000px) {
        height: 20vw;
      }
    }
    .subamin-title {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
      color: ${({ darkmode }) => (darkmode ? "#D7DADC" : "black")};
      @media screen and (max-width: 1000px) {
        padding: 1rem 0;
      }
      .logo {
        img {
          margin-top: -2rem;
          height: 8rem;
          width: 8rem;
          border-radius: 8rem;
          object-fit: cover;
          @media screen and (max-width: 1000px) {
            height: 4rem;
            width: 4rem;
            border-radius: 4rem;
          }
        }
      }
      .name {
        position: relative;
        display: flex;
        align-items: center;
        padding-right: 70px;
        h1 {
          padding: 0 1rem;
        }
      }
    }
  }
  .article {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    background-color: ${({ darkmode }) => (darkmode ? "black" : "#dae0e6")};
    min-height: 80vh;
    @media screen and (max-width: 1000px) {
      flex-direction: column;
      justify-content: flex-start;
    }
    .left {
      width: 60%;
      display: flex;
      justify-content: flex-end;
      @media screen and (max-width: 1000px) {
        width: 100%;
        order: 2;
      }
      .posts {
        width: ${({ classicview }) => (classicview ? "100%" : "70%")};
        @media screen and (max-width: 1000px) {
          width: 100%;
        }
      }
    }
    .right {
      width: 30%;
      @media screen and (max-width: 1000px) {
        width: 100%;
        order: 1;
      }
      .about {
        width: 20rem;
        background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
        color: ${({ darkmode }) => (darkmode ? "#D7DADC" : "black")};
        margin-top: 1rem;
        @media screen and (max-width: 1000px) {
          width: 100%;
        }
        h1 {
          padding: 1rem;
          background-color: ${({ darkmode }) =>
            darkmode ? "#1A1A1B" : "#1484D6"};
        }
        p {
          padding: 1rem;
        }
      }
    }
  }
`;
