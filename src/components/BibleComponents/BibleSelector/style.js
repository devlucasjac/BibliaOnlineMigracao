import styled from "styled-components";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export const CardConteiner = styled(Card)({
  maxWidth: "95vw",
  height: "95vh",
  overflowY: "auto",
  margin: "auto",
  marginTop: "5px",
  padding: "10px",
});

export const StyledContent = styled(CardContent)({
  display: "flex",
  justifyContent: "space-between",
  maxWidth: "90vw",
  flexWrap: "wrap",
});
