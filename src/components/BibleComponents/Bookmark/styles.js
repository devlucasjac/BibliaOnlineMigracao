import styled from "styled-components";

import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

export const StyledMark = styled.div`
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.1);
  }
`;

export const StyledMarked = styled(BookmarkAddedIcon)`
  color: ${(props) => (props.isLit === true ? `var(--black)` : `var(--white)`)};
`;

export const StyledUnMarked = styled(BookmarkAddIcon)`
  color: ${(props) => (props.isLit === true ? `var(--black)` : `var(--white)`)};
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
