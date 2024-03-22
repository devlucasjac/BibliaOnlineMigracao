import Typography from "@mui/material/Typography";

import { useContext } from "react";

import parse from "html-react-parser";

import { StyledVerse, VerseContainer } from "./style.js";

import FontStyle from "../../../context/FontStyle";
import DarkMode from "../../../context/DarkMode.js";

function ShowVerse({ verse }) {
  const { font } = useContext(FontStyle);
  const { isLit } = useContext(DarkMode);

  return (
    <VerseContainer isLit={isLit}>
      <StyledVerse
        variant="span"
        bold={font.bold}
        size={font.size}
        isLit={isLit}
      >
        <Typography
          variant="span"
          style={{
            paddingBottom: "1.6em",
            paddingTop: "1em",
            fontSize: "0.68em",
            color: "var(--gray-500)",
            verticalAlign: "super",
            whiteSpace: "pre",
          }}
        >
          {verse.verse}
        </Typography>
        {parse(verse.text)}
      </StyledVerse>
    </VerseContainer>
  );
}

export default ShowVerse;
