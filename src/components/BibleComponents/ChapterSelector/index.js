import { useState, useEffect, useContext } from "react";

import CurrentBook from "../../../context/CurrentBook";
import Books from "../../../context/Books";

import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import { StyledClose } from "../BibleSelector/style";

import Loading from "../../GeneralComponents/Loading/index";

function ChapterSelector({ showSelector }) {
  const { currentBook, setCurrentBook } = useContext(CurrentBook);
  const { books } = useContext(Books);

  const [chapters, setChapters] = useState();

  useEffect(() => {
    const book = books.find((book) => book.bookid == currentBook.book);
    let rows = [];
    for (let i = 1; i <= book.chapters; i++) {
      rows.push(i);
    }
    setChapters(rows);
  }, [currentBook.book]);

  function handleClick(e) {
    setCurrentBook({
      ...currentBook,
      chapterNum: e.target.value,
    });
    
    showSelector(false);
  }

  return (
    <Card
      sx={{
        maxWidth: "40vw",
        margin: "50px auto",
        overflowY: "auto",
        maxHeight: "80vh",
        padding: "8px",
      }}
    >
      <StyledClose onClick={() => showSelector(false)} />
      {chapters ? (
        <CardContent>
          {chapters.map((chapter) => {
            return (
              <Button
                sx={{
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  fontSize: "small",
                  border: "1px var(--gray-100) solid",
                  margin: "5px",
                }}
                onClick={handleClick}
                value={chapter}
              >
                {chapter}
              </Button>
            );
          })}
        </CardContent>
      ) : (
        <Loading />
      )}
    </Card>
  );
}

export default ChapterSelector;
