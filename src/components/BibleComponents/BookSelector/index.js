import { useState, useEffect, useContext } from "react";

import CurrentBook from "../../../context/CurrentBook";

import Loading from "../../GeneralComponents/Loading/index";

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
    <>
      {books ? (
        <>
          {books.map((book) => (
            <button onClick={handleClose} value={book.bookid}>
              {book.name}
            </button>
          ))}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default BookSelector;
