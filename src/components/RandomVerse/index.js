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

  const getRandom = (maxNumber) => {
    return Math.floor(Math.random() * maxNumber) + 1;
  };

  const [randBook] = useState(() => {
    const book = books[getRandom(books.length)];
    if (book !== undefined) {
      return book.bookid;
    } else {
      return 18;
    }
  });
  const [randChapter] = useState(() => {
    if (books[randBook - 1].chapters !== undefined) {
      return getRandom(books[randBook - 1].chapters);
    } else {
      return 1;
    }
  });
  const randVerse = getRandom(10);

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      BASE_URL +
        "get-verse/" +
        currentBook.bible +
        "/" +
        randBook +
        "/" +
        randChapter +
        "/" +
        randVerse +
        "/"
    );
    xhr.send();
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = xhr.response;
        setVerse(JSON.parse(data));
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };
  }, []);

  return (
    <section>
      {verse ? (
        <>
          <h4>Livro:{books[randBook].name}</h4>
          <h5>Capitulo:{randChapter}</h5>
          <ShowVerse verse={verse} />
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
}

export default RandomVerse;
