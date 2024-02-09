import { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../../../configs";

import CurrentBook from "../../../context/CurrentBook";
import Books from "../../../context/Books";

import Loading from "../../GeneralComponents/Loading/index";
import ShowVerse from "../ShowVerse/index";
import HeaderBible from "../HeaderBible/index";
import Bookmark from "../Bookmark/index";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";

import Button from "@mui/material/Button";

function BibleReader() {
  const { currentBook, setCurrentBook } = useContext(CurrentBook);
  const { books } = useContext(Books);

  const [chapter, setChapter] = useState();

  function findBook(bookId) {
    let findedBook = books.find((book) => book.bookid == bookId);
    if (findedBook === undefined) {
      setCurrentBook({ ...currentBook, book: 40 });
    }
    return findedBook;
  }

  const book = findBook(currentBook.book);

  useEffect(() => {
    console.log("abriu biblia");
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      BASE_URL +
        "get-text/" +
        currentBook.bible +
        "/" +
        currentBook.book +
        "/" +
        currentBook.chapterNum +
        "/"
    );
    xhr.send();
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = xhr.response;
        setChapter(JSON.parse(data));
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };
  }, [currentBook]);

  function changeChapter(e) {
    const valor = e.target.value;
    if (valor === "proximo") {
      if (currentBook.chapterNum === book.chapters) {
        setCurrentBook({
          ...currentBook,
          book: currentBook.book + 1,
          chapterNum: 1,
        });
      } else {
        setCurrentBook({
          ...currentBook,
          chapterNum: currentBook.chapterNum + 1,
        });
      }
    } else {
      if (currentBook.chapterNum === 1) {
        setCurrentBook({
          ...currentBook,
          book: currentBook.book - 1,
          chapterNum: findBook(currentBook.book - 1).chapters,
        });
      } else {
        setCurrentBook({
          ...currentBook,
          chapterNum: currentBook.chapterNum - 1,
        });
      }
    }
  }

  return (
    <>
      {chapter && book ? (
        <Card sx={{ maxWidth: "80%", margin: "0 auto" }}>
          <CardContent
            sx={{
              backgroundColor: "black",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <HeaderBible />
          </CardContent>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: 0,
            }}
          >
            <Bookmark />
          </CardContent>
          <CardContent>
            <h2 style={{ marginBottom: "15px" }}>
              {book.name}: {currentBook.chapterNum}
            </h2>
            <article style={{ padding: "20px" }}>
              {chapter.map((verse) => (
                <ShowVerse verse={verse} key={verse.id} />
              ))}
            </article>
          </CardContent>

          <CardContent
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              value="anterior"
              onClick={changeChapter}
              disabled={
                currentBook.book === 1 && currentBook.chapterNum === 1 && true
              }
            >
              Anterior
            </Button>

            <Button
              value="proximo"
              onClick={changeChapter}
              disabled={
                currentBook.book === books[books.length - 1].bookid &&
                currentBook.chapterNum === book.chapters &&
                true
              }
              sx={{ padding: 0 }}
            >
              Proximo
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default BibleReader;
