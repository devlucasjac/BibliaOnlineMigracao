import { useContext } from "react";

import CurrentBook from "../../../context/CurrentBook";

import { StyledDiv, StyledTip, StyledMark } from "./styles";

function Bookmark() {
  const { currentBook } = useContext(CurrentBook);
  return (
    <StyledMark
      style={{ style: "unset" }}
      onClick={() => {
        window.localStorage.setItem("Bible", currentBook.bible);
        window.localStorage.setItem("Book", currentBook.book);
        window.localStorage.setItem("ChapterNum", currentBook.chapterNum);
      }}
    >
      <StyledDiv></StyledDiv>
      <StyledTip></StyledTip>
    </StyledMark>
  );
}

export default Bookmark;
