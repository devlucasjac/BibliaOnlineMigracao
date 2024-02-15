import { useState, useEffect, useContext } from "react";

import CurrentBook from "../../../context/CurrentBook";

import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import Loading from "../../GeneralComponents/Loading/index";

import { StyledClose } from "../BibleSelector/style";

import { BASE_URL } from "../../../configs";

function BookSelector({ showSelector }) {
  const { currentBook, setCurrentBook } = useContext(CurrentBook);

  const [books, setBooks] = useState();

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL + "get-books/" + currentBook.bible + "/");
    xhr.send();
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = xhr.response;
        setBooks(JSON.parse(data));
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };
  });

  function handleClose(e) {
    setCurrentBook({
      ...currentBook,
      book: e.target.value,
      chapterNum: 1,
    });
    showSelector(false);
  }

  return (
    <Card
      sx={{
        maxWidth: "60vw",
        margin: "50px auto",
        overflowY: "auto",
        maxHeight: "80vh",
        padding: "10px",
      }}
    >
      <StyledClose onClick={() => showSelector(false)} />
      {books ? (
        <CardContent>
          {books.map((book) => (
            <Button
              size="small"
              sx={{
                padding: 0,
                maxWidth: "400px",
                margin: "5px",
              }}
              onClick={handleClose}
              value={book.bookid}
            >
              * {book.name}
            </Button>
          ))}
        </CardContent>
      ) : (
        <></>
      )}
    </Card>
  );
}

export default BookSelector;
