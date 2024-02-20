import BibleReader from "../../components/BibleComponents/BibleReader/index";
import Loading from "../../components/GeneralComponents/Loading/index";
import RandomVerse from "../../components/BibleComponents/RandomVerse/index";

import CurrentBook from "../../context/CurrentBook";
import Books from "../../context/Books";

import { BASE_URL } from "../../configs";

import { useEffect, useContext } from "react";

function Bible() {
  const { currentBook, setCurrentBook } = useContext(CurrentBook);
  const { books, setBooks } = useContext(Books);

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
