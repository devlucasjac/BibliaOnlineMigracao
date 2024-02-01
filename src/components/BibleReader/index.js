import { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../../configs";

import CurrentBook from "../../context/CurrentBook";
import Books from "../../context/Books";

import Loading from "../Loading/index";
import ShowVerse from "../ShowVerse/index";

function BibleReader() {
  const { currentBook, setCurrentBook } = useContext(CurrentBook);
  const { books, setBooks } = useContext(Books);

  const [chapter, setChapter] = useState();

  function findBook(bookId) {
    return books.find((book) => book.bookid === bookId);
  }

  const book = findBook(currentBook.book);

  useEffect(() => {
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
        if (data === "[]") {
          if (currentBook.chapterNum > book.chapters) {
            setCurrentBook({
              ...currentBook,
              book: currentBook.book + 1,
              chapterNum: 1,
            });
          } else {
            setCurrentBook({
              ...currentBook,
              book: currentBook.book - 1,
              chapterNum: findBook(currentBook.book - 1).chapters,
            });
          }
          console.log(data);
          console.log(book);
        } else {
          setChapter(JSON.parse(data));
        }
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };
  }, [currentBook]);

  function changeChapter(e) {
    const valor = e.target.value;

    if (valor === "proximo") {
      setCurrentBook({
        ...currentBook,
        chapterNum: currentBook.chapterNum + 1,
      });
    } else {
      setCurrentBook({
        ...currentBook,
        chapterNum: currentBook.chapterNum - 1,
      });
    }
  }

  return (
    <>
      {chapter ? (
        <div>
          <h2>Livro:{book.name}</h2>
          <h3>Capitulo:{currentBook.chapterNum}</h3>
          <article>
            {chapter.map((verse) => (
              <ShowVerse verse={verse} key={verse.id} />
            ))}
          </article>

          <button value="anterior" onClick={changeChapter}>
            Anterior
          </button>
          <button value="proximo" onClick={changeChapter}>
            Proximo
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default BibleReader;
