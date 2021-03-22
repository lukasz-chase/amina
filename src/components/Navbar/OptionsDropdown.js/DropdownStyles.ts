import styled from "styled-components";

type DropdownProps = {
  open: boolean;
};

export const Dropdown = styled.div<DropdownProps>`
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #1a1a1b;
  position: absolute;
  top: 50px;
  right: 0;
  .options {
    color: #818384;
    font-size: 0.6rem;
    .header {
      padding: 0.2rem 1rem;
    }
  }
  .stuff {
    color: #818384;
    font-size: 0.6rem;
    position: relative;
    z-index: 1;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translate(20%, 50%);
      height: 1px;
      width: 70%;
      border-bottom: 1px solid #818384;
    }
    .header {
      padding: 0.2rem 1rem;
    }
  }
`;
export const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #d7dad0;
  padding: 0.6rem 1rem;
  width: 13rem;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: #d7dadc;
    color: black;
  }
  .option-icon {
    margin: 0 6px;
  }
`;
