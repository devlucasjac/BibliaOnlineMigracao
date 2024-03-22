import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import ShowVerse from "../ShowVerse";

import { useContext } from "react";

import Books from "../../../context/Books";
import DarkMode from "../../../context/DarkMode.js";

import { StyledCard } from "./style.js";

function VerseContainer({ verse, title, handleClick }) {
  const { books } = useContext(Books);
  const { isLit } = useContext(DarkMode);

  function findBook(bookid) {
    if (books.find((book) => book.bookid === bookid) === undefined) {
      return "livro não encontrado 😢";
    }
    return books.find((book) => book.bookid === bookid);
  }

  return (
    <>
      {verse.verse ? (
        <StyledCard
          onClick={() => {
            handleClick !== undefined && handleClick(verse);
          }}
          isLit={isLit}
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
        </StyledCard>
      ) : (
        <div>Verso não encontrado</div>
      )}
    </>
  );
}

export default VerseContainer;
