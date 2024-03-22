import styled from "styled-components";

import Typography from "@mui/material/Typography";

export const VerseContainer = styled.div`
  margin: "5px";
  background-color: ${(props) =>
    props.isLit === true ? `var(--white)` : `var(--black)`};
`;

export const StyledVerse = styled(Typography)`
  font-weight: ${(props) => props.bold};
  font-size: ${(props) => props.size};
  color: ${(props) =>
    props.isLit === true ? `var(--black)` : `var(--gray-100)`};
  &:hover {
    text-decoration: ${(props) =>
      props.isLit === true
        ? `underline var(--yellow-300) 3px`
        : `underline var(--red-500) 3px`};
    cursor: pointer;
  }
`;
