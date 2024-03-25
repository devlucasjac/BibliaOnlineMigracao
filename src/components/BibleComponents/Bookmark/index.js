import { useContext, useState } from "react";

import CurrentBook from "../../../context/CurrentBook";
import DarkMode from "../../../context/DarkMode.js";

import { StyledMark, StyledMarked, StyledUnMarked } from "./styles";

function Bookmark() {
  const { currentBook } = useContext(CurrentBook);
  const { isLit } = useContext(DarkMode);

  const localChapter = window.localStorage.getItem("ChapterNum");
  const [savedBible, setSavedBible] = useState(localChapter);

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
      {currentBook.chapterNum == savedBible ? (
        <StyledMarked isLit={isLit} />
      ) : (
        <StyledUnMarked isLit={isLit} />
      )}
    </StyledMark>
  );
}

export default Bookmark;
