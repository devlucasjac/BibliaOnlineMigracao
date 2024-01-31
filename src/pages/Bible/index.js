import BibleReader from "../../components/BibleReader/index";
import CurrentBook from "../../context/CurrentBook";

import { useState, useEffect } from "react";

function Bible() {
  const [currentBook, setCurrentBook] = useState({
    bible: "ARA",
    book: 1,
    chapterNum: 1,
  });

  return (
    <div>
      <CurrentBook.Provider value={{ currentBook, setCurrentBook }}>
        <BibleReader lastChapter={50}></BibleReader>
      </CurrentBook.Provider>
    </div>
  );
}

export default Bible;
