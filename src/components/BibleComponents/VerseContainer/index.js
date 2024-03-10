import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import ShowVerse from "../ShowVerse";

import { useContext } from "react";

import Books from "../../../context/Books";

function VerseContainer({ verse, title, handleClick }) {
  const { books } = useContext(Books);
  function findBook(bookid) {
    if (books.find((book) => book.bookid === bookid) === undefined) {
      return "livro não encontrado 😢";
    }
    return books.find((book) => book.bookid === bookid);
  }

  return (
    <>
      {verse.verse ? (
        <Card
          sx={{ margin: "50px auto", maxWidth: "80%" }}
          onClick={() => {
            handleClick !== undefined ? handleClick(verse) : console.log("oi");
          }}
        >
          <CardContent>
            {title && <Typography variant="h5">{title}</Typography>}
            <Typography variant="h6">
              Livro:{findBook(verse.book).name}
            </Typography>
            <Typography variant="p" sx={{ display: "block", margin: "5px" }}>
              Capitulo:{verse.chapter}
            </Typography>
            <ShowVerse verse={verse} />
          </CardContent>
        </Card>
      ) : (
        <div>Verso não encontrado</div>
      )}
    </>
  );
}

export default VerseContainer;
