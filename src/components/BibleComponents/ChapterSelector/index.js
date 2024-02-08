import { useState, useEffect, useContext } from "react";

import CurrentBook from "../../../context/CurrentBook";
import Books from "../../../context/Books";

import Loading from "../../GeneralComponents/Loading/index";

function ChapterSelector({ showSelector }) {
  const { currentBook, setCurrentBook } = useContext(CurrentBook);
  const { books } = useContext(Books);

  const [chapters, setChapters] = useState();

  useEffect(() => {
    console.log(books, currentBook.book);
    const book = books.find((book) => book.bookid == currentBook.book);
    let rows = [];
    for (let i = 1; i <= book.chapters; i++) {
      rows.push(i);
    }
    setChapters(rows);
  }, [currentBook.book]);

  function handleClick(e) {
    setCurrentBook({
      ...currentBook,
      chapterNum: e.target.value,
    });
    console.log(e.target.value);
    showSelector(false);
  }

  return (
    <>
      {chapters ? (
        <>
          {chapters.map((chapter) => {
            return (
              <button onClick={handleClick} value={chapter}>
                {chapter}
              </button>
            );
          })}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default ChapterSelector;
