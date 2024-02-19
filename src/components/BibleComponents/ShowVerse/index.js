import Typography from "@mui/material/Typography";

function ShowVerse({ verse, isHtml }) {
  return (
    <>
      <Typography variant="span">
        <Typography
          variant="span"
          style={{
            paddingBottom: "1.6em",
            paddingTop: "1em",
            fontSize: "0.68em",
            color: "blue",
            verticalAlign: "super",
            whiteSpace: "pre",
          }}
        >
          {verse.verse}
        </Typography>
        {verse.text}
      </Typography>
    </>
  );
}

export default ShowVerse;
