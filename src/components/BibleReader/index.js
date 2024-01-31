import { useState, useEffect, useContext } from "react";
import { key, BASE_URL } from "../../configs";

import CurrentBook from "../../context/CurrentBook";

import Loading from "../Loading/index";
import ShowVerse from "../ShowVerse/index";

function BibleReader({ lastChapter }) {
  const { currentBook, setCurrentBook } = useContext(CurrentBook);

  const [chapterNumber, setChapterNumber] = useState(currentBook.chapterNum);
  const [chapter, setChapter] = useState();
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    console.log(chapterNumber);
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      BASE_URL +
        "get-text/" +
        currentBook.bible +
        "/" +
        currentBook.book +
        "/" +
        chapterNumber +
        "/"
    );
    xhr.send();
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = xhr.response;
        setChanged(false);
        setChapter(JSON.parse(data));
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };
  }, [chapterNumber, currentBook]);

  function changeChapter(e) {
    const valor = e.target.value;
    setChanged(true);
    if (valor === "proximo") {
      if (chapterNumber === lastChapter) {
        console.log("mesmo numero");
        return;
      }
      setChapterNumber(chapterNumber + 1);
    } else {
      setChapterNumber(chapterNumber - 1);
    }
  }

  return (
    <>
      {chapter ? (
        <div>
          <h2>Capitulo:{chapterNumber}</h2>
          <article>
            {chapter.map((verse) => (
              <ShowVerse verse={verse} />
            ))}
          </article>

          {!changed && (
            <>
              <button value="anterior" onClick={changeChapter}>
                Anterior
              </button>
              <button value="proximo" onClick={changeChapter}>
                Proximo
              </button>
            </>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default BibleReader;
