import { useContext, useState } from "react";

import CurrentBook from "../../../context/CurrentBook";
import DarkMode from "../../../context/DarkMode.js";

import { StyledMark, StyledMarked, StyledUnMarked } from "./styles";

function Bookmark() {
  const { currentBook } = useContext(CurrentBook);
  const { isLit } = useContext(DarkMode);

  const localBible = window.localStorage.getItem("Bible");
  const localBook = parseInt(window.localStorage.getItem("Book"));
  const localChapter = window.localStorage.getItem("ChapterNum");
  const [savedBible, setSavedBible] = useState({
    bible: localBible,
    book: localBook,
    chapterNum: localChapter,
  });
  function checkChapter() {
    let isEqual = false;
    if (
      savedBible.bible == currentBook.bible &&
      savedBible.book == currentBook.book &&
      savedBible.chapterNum == currentBook.chapterNum
    ) {
      isEqual = true;
    }
    return isEqual;
  }
  return (
    <StyledMark
      style={{ style: "unset" }}
      onClick={() => {
        setSavedBible(currentBook.chapterNum);
        window.localStorage.setItem("Bible", currentBook.bible);
        window.localStorage.setItem("Book", currentBook.book);
        window.localStorage.setItem("ChapterNum", currentBook.chapterNum);
      }}
    >
      {checkChapter() ? (
        <StyledMarked isLit={isLit} />
      ) : (
        <StyledUnMarked isLit={isLit} />
      )}
    </StyledMark>
  );
}

export default Bookmark;
