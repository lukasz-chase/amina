import styled from "styled-components";

export const SearchPageComponent = styled.div`
  .header {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 8rem;
    h1 {
      font-size: 1.3rem;
      padding-bottom: 0.2rem;
    }
    p {
      font-size: 0.8rem;
      color: #848484;
    }
    .links {
      .link {
        text-decoration: none;
        color: black;
        padding: 0.5rem;
        margin: 0 0.5rem;
      }
      .active {
        border-bottom: 3px solid #0079d3;
      }
    }
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dae0e6;
  min-height: 34rem;
  padding: 1rem;
  font-size: 0.8rem;
  .subamins {
    width: 80%;
    .community {
      display: flex;
      justify-content: space-between;
      background-color: white;
      align-items: center;
      padding: 5px;
      .left {
        display: flex;
        align-items: center;
        img {
          height: 3rem;
          width: 3rem;
          border-radius: 3rem;
          object-fit: cover;
        }
        .name-members {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          color: #8c8f90;
          .name {
            color: black;
          }
        }
      }
      .info {
        color: #8c8f90;
      }
    }
  }
  .posts {
    width: 60%;
    display: flex;
    flex-direction: column;
  }
`;
