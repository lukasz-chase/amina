import styled from "styled-components";

interface DetailsProps {
  bgimage: string;
  darkmode: boolean;
  classicview: boolean;
}
interface FormProps {
  darkmode: boolean;
  ready: boolean;
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
        display: flex;
        flex-direction: column;
        .change-icon {
          cursor: pointer;
        }
        img {
          margin-top: -2rem;
          height: 6rem;
          width: 6rem;
          border-radius: 6rem;
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
        width: 20vw;
        background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
        color: ${({ darkmode }) => (darkmode ? "#D7DADC" : "black")};
        margin-top: 1rem;
        border: 1px solid #474748;
        display: flex;
        flex-direction: column;
        .edit-desc,
        .delete-subamin {
          cursor: pointer;
        }
        .delete {
          display: flex;
          align-items: center;
          padding: 1rem;
          p {
            cursor: pointer;
          }
        }
        .edit-desc {
          margin: 0 0.5rem;
        }
        @media screen and (max-width: 1000px) {
          width: 100%;
        }
        h1 {
          color: ${({ darkmode }) => (darkmode ? "#818384" : "black")};
          padding: 1rem;
          background-color: ${({ darkmode }) =>
            darkmode ? "#1A1A1B" : "#1484D6"};
          font-size: 1rem;
        }
        p {
          padding: 0.5rem 1rem;
        }
        .new-post {
          background: ${({ darkmode }) => (darkmode ? "#C8CBCD" : "#1484D6")};
          color: ${({ darkmode }) => (darkmode ? "black" : "white")};
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          padding: 0.3rem 0.5rem;
          border-radius: 5rem;
          margin: 0.5rem 0.5rem;
        }
        .line {
          align-self: center;
          height: 1px;
          margin: 0.5rem 0;
          width: 90%;
          background-color: ${({ darkmode }) =>
            darkmode ? "#343536" : "black"};
        }
      }
    }
  }
`;
export const Form = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
  padding: 0.5rem;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
  .MuiInputBase-input {
    padding: 0.5rem;
    background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
    color: ${({ darkmode }) => (darkmode ? "#CDD0D2" : "black")};
  }
  .community-logo {
    border: ${({ darkmode }) =>
      darkmode ? "1px solid #343536" : "1px solid black"};
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
  }
  .community-desc {
    padding: 0.5rem;
    border: ${({ darkmode }) =>
      darkmode ? "1px solid #343536" : "1px solid black"};
    font-family: "Noto Sans", sans-serif;
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
  }
  .submit,
  .cancel {
    padding: 0.5rem;
    width: 50%;
    cursor: ${({ ready }) => (ready ? "pointer" : "no-drop")};
    background: ${({ darkmode }) => (darkmode ? "#C8CBCD" : "#1484D6")};
    color: ${({ darkmode }) => (darkmode ? "black" : "white")};
    outline: none;
    border: none;
    border-radius: 5rem;
    margin: 0.5rem 0;
    align-self: flex-end;
  }
  .cancel {
    cursor: pointer;
  }
`;
