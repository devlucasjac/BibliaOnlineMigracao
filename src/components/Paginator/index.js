import CurrentBook from "../../context/CurrentBook";
import Books from "../../context/Books";
import Pagination from "@mui/material/Pagination";

import { useContext } from "react";

function Paginator({ findBook }) {
  const { currentBook, setCurrentBook } = useContext(CurrentBook);
  const { books, setBooks } = useContext(Books);

  function changeBook(e) {
    const valor = e.target.value;
    if (valor === "proximo") {
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
  }
  function changeChapter(event, value) {
    setCurrentBook({ ...currentBook, chapterNum: value });
  }

  return (
    <>
      <button
        value="anterior"
        onClick={changeBook}
        disabled={currentBook.book === 1 && true}
      >
        Livro Anterior
      </button>
      <Pagination
        count={findBook(currentBook.book).chapters}
        onChange={changeChapter}
        page={currentBook.chapterNum}
      ></Pagination>
      <button
        value="proximo"
        onClick={changeBook}
        disabled={currentBook.book === books[books.length - 1].bookid && true}
      >
        Proximo Livro
      </button>
    </>
  );
}

export default Paginator;
