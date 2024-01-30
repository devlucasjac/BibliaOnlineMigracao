import { useState, useEffect } from "react";
import { key, BASE_URL } from "../../configs";

import Loading from "../Loading/index";
import ShowVerse from "../ShowVerse/index";

function BibleReader({ bible, book }) {
  const [chapterNumber, setChapterNumber] = useState(1);
  const [chapter, setChapter] = useState();
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    console.log(chapterNumber);
    fetch(`${BASE_URL}verses/${bible}/${book}/${chapterNumber}`, {
      method: "GET",
      //headers: { "api-key": key },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setChanged(false);
        console.log(data);
        setChapter(data);
      })
      .catch((err) => console(err));
  }, [chapterNumber, bible, book]);

  function changeChapter(e) {
    const valor = e.target.value;
    setChanged(true);
    if (valor === "proximo") {
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
            {chapter.verses.map((verse) => (
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
/*     {chapter.content.attrs.style === "s"
            ? chapter.content.items.map((item) => <h1>{item.text}</h1>)
            : chapter.content.items.map((item) => <p>{item.items.text}</p>)}
          <article>{chapter.content}</article>*/
//dangerouslySetInnerHTML={{ __html: chapter.content }}
