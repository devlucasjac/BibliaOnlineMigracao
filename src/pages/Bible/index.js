import BibleReader from "../../components/BibleReader/index";
import Loading from "../../components/Loading/index";
import RandomVerse from "../../components/RandomVerse/index";

import CurrentBook from "../../context/CurrentBook";
import Books from "../../context/Books";

import { BASE_URL } from "../../configs";

import { useState, useEffect } from "react";

function Bible() {
  const [books, setBooks] = useState();
  const [currentBook, setCurrentBook] = useState({
    bible: "ARA",
    book: 1,
    chapterNum: 1,
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
  }, [currentBook.bible]);

  return (
    <div>
      <CurrentBook.Provider value={{ currentBook, setCurrentBook }}>
        <Books.Provider value={{ books, setBooks }}>
          {books ? (
            <>
              <RandomVerse />
              <BibleReader />
            </>
          ) : (
            <Loading />
          )}
        </Books.Provider>
      </CurrentBook.Provider>
    </div>
  );
}

export default Bible;
