import { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../../configs";

import CurrentBook from "../../context/CurrentBook";
import Books from "../../context/Books";

import Loading from "../Loading/index";
import ShowVerse from "../ShowVerse/index";
import HeaderBible from "../HeaderBible/index";

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
      {chapter ? (
        <div>
          <HeaderBible />
          <h2>
            {book.name}: {currentBook.chapterNum}
          </h2>
          <button
            onClick={() => {
              window.localStorage.setItem("Bible", currentBook.bible);
              window.localStorage.setItem("Book", currentBook.book);
              window.localStorage.setItem("ChapterNum", currentBook.chapterNum);
            }}
          >
            Marcar Pagina
          </button>
          <article>
            {chapter.map((verse) => (
              <ShowVerse verse={verse} key={verse.id} />
            ))}
          </article>
          <button
            value="anterior"
            onClick={changeChapter}
            disabled={
              currentBook.book === 1 && currentBook.chapterNum === 1 && true
            }
          >
            Anterior
          </button>

          <button
            value="proximo"
            onClick={changeChapter}
            disabled={
              currentBook.book === books[books.length - 1].bookid &&
              currentBook.chapterNum === book.chapters &&
              true
            }
          >
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
