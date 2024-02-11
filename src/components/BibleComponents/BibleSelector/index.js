import { useState, useEffect, useContext } from "react";
import CurrentBook from "../../../context/CurrentBook";

import Loading from "../../GeneralComponents/Loading/index";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

import { BASE_URL } from "../../../configs";
import { ButtonGroup } from "@mui/material";

function BibleSelector({ showSelector }) {
  const { currentBook, setCurrentBook } = useContext(CurrentBook);
  const [bibles, setBibles] = useState();

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL + "static/bolls/app/views/languages.json");
    xhr.send();
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = xhr.response;
        setBibles(JSON.parse(data));
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };
  }, []);

  function changeBible(e) {
    setCurrentBook({
      ...currentBook,
      bible: e.target.value,
      book: 1,
      chapterNum: 1,
    });

    showSelector(false);
  }

  return (
    <Card
      sx={{
        maxWidth: "95%",
        margin: "auto",
        marginTop: "5px",
        padding: "10px",
      }}
    >
      <CardContent sx={{ padding: 0 }}>
        <CloseIcon onClick={() => showSelector(false)} />
      </CardContent>
      {bibles ? (
        <>
          {bibles.map((bible) => {
            return (
              <>
                <Typography
                  variant="h6"
                  sx={{ display: "inline-block", fontSize: "medium" }}
                >
                  {bible.language}
                </Typography>

                {bible.translations.map((translation) => (
                  <Button
                    size="small"
                    sx={{
                      display: "inline-block",
                      fontSize: "small",
                      fontWeigth: "lighter",
                      padding: 0,
                    }}
                    onClick={changeBible}
                    value={translation.short_name}
                  >
                    {translation.full_name}
                  </Button>
                ))}
              </>
            );
          })}
        </>
      ) : (
        <Loading />
      )}
    </Card>
  );
}

export default BibleSelector;
