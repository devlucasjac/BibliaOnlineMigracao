import ShowVerse from "../ShowVerse/index";
import Loading from "../Loading/index";

import { useEffect, useState, useContext } from "react";

import { BASE_URL } from "../../configs";

import CurrentBook from "../../context/CurrentBook";
import Books from "../../context/Books";

function RandomVerse() {
  const [verse, setVerse] = useState();

  const { currentBook } = useContext(CurrentBook);
  const { books } = useContext(Books);

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL + "get-random-verse/" + currentBook.bible + "/");
    xhr.send();
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = xhr.response;
        setVerse(JSON.parse(data));
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };
  }, [currentBook.bible]);

  function findBook(bookid) {
    return books.find((book) => book.bookid === bookid).name;
  }

  return (
    <section>
      {verse ? (
        <>
          <h4>Livro:{findBook(verse.book)}</h4>
          <h5>Capitulo:{verse.chapter}</h5>
          <ShowVerse verse={verse} />
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
}

export default RandomVerse;
