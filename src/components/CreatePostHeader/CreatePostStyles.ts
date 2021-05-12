import styled from "styled-components";

type Props = {
  darkmode: boolean;
};

export const CreatePostComponent = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  align-items: center;
  background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #474748;
  img {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 2.5rem;
    cursor: pointer;
  }
  .link {
    text-decoration: none;
    .textField {
      color: ${({ darkmode }) => (darkmode ? "white" : "gray")};
      border: 1px solid gray;
      width: 36vw;
      padding: 0.3rem;
      background-color: ${({ darkmode }) =>
        darkmode ? "#272729" : "lightgray"};
      border-radius: 5px;
      font-family: "Noto Sans", sans-serif;
      @media screen and (max-width: 1000px) {
        width: 50vw;
      }
      &:hover {
        border: 1px solid #d7dadc;
      }
      &:focus {
        border: 1px solid #d7dadc;
      }
      .search-icon {
        color: #818384;
        font-size: 1.5rem;
        margin-left: 10px;
      }
    }
  }
`;
