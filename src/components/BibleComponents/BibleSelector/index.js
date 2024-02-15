import { useState, useEffect, useContext } from "react";
import CurrentBook from "../../../context/CurrentBook";

import Loading from "../../GeneralComponents/Loading/index";

import Typography from "@mui/material/Typography";

import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import { CardConteiner, StyledContent, StyledClose } from "./style";

import { BASE_URL, Flags } from "../../../configs";

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
        console.log(JSON.parse(data)[0]);
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
    for (let i = 0; i < Flags.length; i++) {
      console.log(Flags[i]);
    }

    showSelector(false);
  }

  return (
    <CardConteiner>
      <StyledClose
        sx={{ width: "20px", heigth: "20px", color: `var(--gray-500)` }}
        onClick={() => showSelector(false)}
      />

      {bibles ? (
        <StyledContent>
          {bibles.map((bible, i) => {
            return (
              <CardContent sx={{ padding: 0, margin: "5px" }}>
                <Typography
                  variant="h6"
                  sx={{
                    display: "inline-block",
                    fontSize: "medium",
                    maxWidth: "800px",
                  }}
                >
                  {Flags[i]}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  {bible.translations.map((translation) => (
                    <Button
                      size="small"
                      sx={{
                        padding: 0,
                        maxWidth: "300px",
                        margin: "5px",
                      }}
                      onClick={changeBible}
                      value={translation.short_name}
                    >
                      * {translation.full_name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            );
          })}
        </StyledContent>
      ) : (
        <Loading />
      )}
    </CardConteiner>
  );
}

export default BibleSelector;
