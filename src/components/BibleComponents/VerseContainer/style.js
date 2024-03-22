import styled from "styled-components";

import Card from "@mui/material/Card";

export const StyledCard = styled(Card)`
  margin: 50px auto;
  max-width: 80%;
  background-color: ${(props) =>
    props.isLit === true ? `var(--white)` : `var(--black)`};
`;
