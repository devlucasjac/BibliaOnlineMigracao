import { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../../configs";

import Paginator from "../Paginator/index";

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
        setChapter(JSON.parse(data));
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };
  }, [currentBook]);

  return (
    <>
      {chapter ? (
        <div>
          <h2>Livro:{book.name}</h2>
          <h3>Capitulo:{currentBook.chapterNum}</h3>
          <Paginator findBook={findBook} />
          <article>
            {chapter.map((verse) => (
              <ShowVerse verse={verse} key={verse.id} />
            ))}
          </article>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default BibleReader;
