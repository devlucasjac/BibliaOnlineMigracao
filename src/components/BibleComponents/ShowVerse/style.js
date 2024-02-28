import styled from "styled-components";

import Typography from "@mui/material/Typography";

export const StyledVerse = styled(Typography)`
  &:hover {
    text-decoration: underline var(--yellow-300) 3px;
    cursor: pointer;
  }
`;
