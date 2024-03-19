import { useContext, useEffect, useState } from "react";

import CurrentBook from "../../../context/CurrentBook";

import { StyledMark } from "./styles";

import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

function Bookmark() {
  const { currentBook } = useContext(CurrentBook);
  const localBible = window.localStorage.getItem("Bible");
  const [savedBible, setSavedBible] = useState(localBible);

  return (
    <StyledMark
      style={{ style: "unset" }}
      onClick={() => {
        setSavedBible(currentBook.bible);
        window.localStorage.setItem("Bible", currentBook.bible);
        window.localStorage.setItem("Book", currentBook.book);
        window.localStorage.setItem("ChapterNum", currentBook.chapterNum);
      }}
    >
      {currentBook.bible === savedBible ? (
        <BookmarkAddedIcon />
      ) : (
        <BookmarkAddIcon />
      )}
    </StyledMark>
  );
}

export default Bookmark;
