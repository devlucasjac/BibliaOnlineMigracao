import Loading from "../../GeneralComponents/Loading/index";

import { useEffect, useState, useContext } from "react";

import { BASE_URL } from "../../../configs";

import CurrentBook from "../../../context/CurrentBook";

import VerseContainer from "../VerseContainer";

function RandomVerse() {
  const [verse, setVerse] = useState();
  const { currentBook } = useContext(CurrentBook);


  
  useEffect(() => {
    console.log("abriu verso");

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

  return (
    <section>
      {verse ? (
        <VerseContainer verse={verse} canva={true} />
      ) : (
        <Loading />
      )}
    </section>
  );
}

export default RandomVerse;
