import styled from "styled-components";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export const StyledBible = styled(Card)`
  background-color: ${(props) =>
    props.isLit === true ? `var(--white)` : `var(--black)`};
  max-width: 80%;
  margin: 0 auto;
`;

export const StyledTitle = styled(Typography)`
  color: ${(props) => (props.isLit === true ? `var(--black)` : `var(--white)`)};
  margin-bottom: 15px;
`;
