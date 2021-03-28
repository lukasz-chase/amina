import styled from "styled-components";

export const DetailsComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;
    font-size: 3rem;
  }
  .post-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      img {
        height: 3rem;
        width: 3rem;
        border-radius: 3rem;
      }
    }
    .details {
    }
  }
  .post-details {
    display: flex;
    flex-direction: column;
    img {
      height: 30vw;
    }
    span {
      font-size: 3rem;
    }
  }
`;
export const CommentsComponent = styled.div`
  display: flex;
  flex-direction: column;
  .comment {
    .sort-comment {
      display: flex;
      align-items: center;
    }
    .header {
      font-size: 1rem;
      display: flex;
      justify-content: flex-start;
    }
    .comment-text {
      padding: 1rem 0;
      font-size: 1.5rem;
    }
  }
`;
