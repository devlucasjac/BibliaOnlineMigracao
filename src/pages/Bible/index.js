import BibleReader from "../../components/BibleReader/index";
import Loading from "../../components/Loading";

import CurrentBook from "../../context/CurrentBook";
import Books from "../../context/Books";

import { BASE_URL } from "../../configs";

import { useState, useEffect } from "react";

function Bible() {
  const [books, setBooks] = useState();
  const [currentBook, setCurrentBook] = useState({
    bible: "ARA",
    book: 1,
    chapterNum: 50,
  });

  useEffect(() => {
    const request = new XMLHttpRequest();
    request.open("GET", BASE_URL + "get-books/" + currentBook.bible + "/");
    request.send();
    request.onload = () => {
      if (request.readyState === 4 && request.status === 200) {
        const data = request.response;
        setBooks(JSON.parse(data));
      } else {
        console.log(`Error: ${request.status}`);
      }
    };
  }, [currentBook]);

  return (
    <div>
      <CurrentBook.Provider value={{ currentBook, setCurrentBook }}>
        <Books.Provider value={{ books, setBooks }}>
          {books ? <BibleReader lastChapter={50}></BibleReader> : <Loading />}
        </Books.Provider>
      </CurrentBook.Provider>
    </div>
  );
}

export default Bible;
