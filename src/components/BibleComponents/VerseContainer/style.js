import styled from "styled-components";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export const StyledCard = styled(Card)`
  margin: 50px auto;
  max-width: 80%;
  background-color: ${(props) =>
    props.isLit === true ? `var(--white)` : `var(--black)`};
`;

export const StyledText = styled(Typography)`
  color: ${(props) => (props.isLit === true ? `var(--black)` : `var(--white)`)};
`;
