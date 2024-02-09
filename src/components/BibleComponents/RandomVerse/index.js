import ShowVerse from "../ShowVerse/index";
import Loading from "../../GeneralComponents/Loading/index";

import { useEffect, useState, useContext } from "react";

import { BASE_URL } from "../../../configs";

import CurrentBook from "../../../context/CurrentBook";
import Books from "../../../context/Books";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function RandomVerse() {
  const [verse, setVerse] = useState();
  const { currentBook } = useContext(CurrentBook);
  const { books } = useContext(Books);

  useEffect(() => {
    console.log("abriu verso");

    const xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL + "get-random-verse/" + currentBook.bible + "/");
    xhr.send();
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = xhr.response;
        setVerse(JSON.parse(data));
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };
  }, [currentBook.bible]);

  function findBook(bookid) {
    if (books.find((book) => book.bookid === bookid) === undefined) {
      return "livro não encontrado 😢";
    }
    return books.find((book) => book.bookid === bookid);
  }

  return (
    <section>
      {verse ? (
        <Card sx={{ margin: "50px auto", maxWidth: "80%" }}>
          <CardContent>
            <Typography variant="h5">Palavra do dia</Typography>
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
        <Loading />
      )}
    </section>
  );
}

export default RandomVerse;
