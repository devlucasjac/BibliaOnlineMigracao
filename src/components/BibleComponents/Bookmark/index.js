import { useContext } from "react";

import CurrentBook from "../../../context/CurrentBook";

function Bookmark() {
  const { currentBook } = useContext(CurrentBook);
  return (
    <button
      onClick={() => {
        window.localStorage.setItem("Bible", currentBook.bible);
        window.localStorage.setItem("Book", currentBook.book);
        window.localStorage.setItem("ChapterNum", currentBook.chapterNum);
      }}
    >
      Marcar Pagina
    </button>
  );
}

export default Bookmark;
