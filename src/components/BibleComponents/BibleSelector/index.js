import { useState, useEffect, useContext } from "react";
import CurrentBook from "../../../context/CurrentBook";

import Loading from "../../GeneralComponents/Loading/index";

import { BASE_URL } from "../../../configs";

function BibleSelector({ showSelector }) {
  const { currentBook, setCurrentBook } = useContext(CurrentBook);
  const [bibles, setBibles] = useState();

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL + "static/bolls/app/views/languages.json");
    xhr.send();
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = xhr.response;
        setBibles(JSON.parse(data));
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };
  }, []);

  function changeBible(e) {
    setCurrentBook({
      ...currentBook,
      bible: e.target.value,
      book: 1,
      chapterNum: 1,
    });

    showSelector(false);
  }

  return (
    <>
      {bibles ? (
        <>
          {bibles.map((bible) => {
            return (
              <>
                <span style={{ color: "white" }}>{bible.language}</span>;
                {bible.translations.map((translation) => (
                  <button onClick={changeBible} value={translation.short_name}>
                    {translation.full_name}
                  </button>
                ))}
              </>
            );
          })}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default BibleSelector;
