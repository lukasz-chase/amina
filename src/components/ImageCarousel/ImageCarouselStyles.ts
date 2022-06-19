//styled
import styled from "styled-components";

interface CarouselProps {
  arrowsVisible: boolean;
}

export const Carousel = styled.div<CarouselProps>`
  img {
    height: 30vw;
    width: 100%;
    object-fit: cover;
    @media screen and (max-width: 1000px) {
      width: 100%;
      height: 60vw;
      margin: 1rem 0;
    }
  }

  .arrows {
    position: absolute;
    margin-top: 25%;
    font-size: 3rem;
    color: black;
    background-color: white;
    border-radius: 50%;
    opacity: ${({ arrowsVisible }) => (arrowsVisible ? "70%" : "0%")};
    transition: 0.3s ease-in;
    &:hover {
      cursor: pointer;
    }
  }
  .left-arrow {
    left: 0;
    margin-left: 15%;
  }
  .right-arrow {
    right: 0;
    margin-right: 10%;
    @media screen and (max-width: 1000px) {
      margin-right: 15%;
    }
  }
`;
