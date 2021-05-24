import styled from "styled-components";

type Props = {
  darkmode: boolean;
};

export const HelpWrapper = styled.div<Props>`
  border: 1px solid #474748;
  background: ${({ darkmode }) => (darkmode ? "#1A1A1B" : "white")};
  color: ${({ darkmode }) => (darkmode ? "#B3B5B7" : "black")};
  width: 20vw;
  margin: 1rem 0;
  font-size: 0.8rem;
  padding: 0.5rem;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
  table {
    tr {
      td {
        padding: 5px 10px;
        width: 10rem;
        cursor: pointer;
      }
    }
    margin-bottom: 1rem;
  }
`;
