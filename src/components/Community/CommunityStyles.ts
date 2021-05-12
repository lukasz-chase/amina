import styled from "styled-components";

type Props = {
  darkmode: boolean;
};

export const CommunityComponent = styled.div<Props>`
  margin: 5px 0;
  display: flex;
  align-items: center;
  position: relative;
  height: 3rem;
  padding: 1rem;
  background-color: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
  border-radius: 10px;
  img {
    height: 2rem;
    width: 2rem;
    border-radius: 2rem;
  }
  .info {
    display: flex;
    flex-direction: column;
    .name {
      text-decoration: none;
    }
    .name,
    .members {
      color: ${({ darkmode }) => (darkmode ? "#D7DADC" : "black")};
      padding: 0 0.5rem;
    }
  }
  .desc {
    color: ${({ darkmode }) => (darkmode ? "#D7DADC" : "black")};
    justify-self: center;
    margin-left: 5rem;
  }
`;
