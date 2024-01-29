import { useState, useEffect } from "react";
import { key } from "../../configs";

import Loading from "../Loading/index";

function BibleReader({ bible }) {
  const [chapterNumber, setChapterNumber] = useState("MAT.1");
  const [chapter, setChapter] = useState();
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    console.log(chapterNumber);
    fetch(
      `https://api.scripture.api.bible/v1/bibles/${bible}/chapters/${chapterNumber}`,
      {
        method: "GET",
        headers: { "api-key": key },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setChanged(false);
        console.log(data.data);
        setChapter(data.data);
      })
      .catch((err) => console(err));
  }, [chapterNumber, bible]);

  function changeChapter(e) {
    const valor = e.target.value;
    setChanged(true);
    if (valor === "proximo") {
      setChapterNumber(chapter.next.id);
    } else {
      setChapterNumber(chapter.previous.id);
    }
  }

  return (
    <>
      {chapter ? (
        <div>
          <article
            dangerouslySetInnerHTML={{ __html: chapter.content }}
          ></article>
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
