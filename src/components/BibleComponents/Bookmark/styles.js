import styled from "styled-components";

export const StyledMark = styled.div`
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.1);
  }
`;

export const StyledDiv = styled.div`
  background-color: var(--red-500);
  min-height: 10px;
`;

export const StyledTip = styled.div`
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-top: 25px solid var(--red-500);
`;
