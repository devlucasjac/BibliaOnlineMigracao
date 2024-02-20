import Typography from "@mui/material/Typography";

import parse from "html-react-parser";

import { StyledVerse } from "./style.js";

function ShowVerse({ verse, isHtml }) {
  return (
    <div style={{ margin: "5px" }}>
      <StyledVerse variant="span">
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
    </div>
  );
}

export default ShowVerse;
