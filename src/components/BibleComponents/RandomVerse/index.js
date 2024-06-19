import Loading from "../../GeneralComponents/Loading/index";

import { useEffect, useState, useContext } from "react";

import { BASE_URL } from "../../../configs";

import CurrentBook from "../../../context/CurrentBook";
import SelectedVerse from "../../../context/SelectedVerse";

import VerseContainer from "../VerseContainer";

function RandomVerse() {
  const [verse, setVerse] = useState();
  const { currentBook } = useContext(CurrentBook);
  const { selectedVerse } = useContext(SelectedVerse);
  
  useEffect(() => {     
    if(selectedVerse.text !== ''){
      setVerse(selectedVerse);
    }else{
      const xhr = new XMLHttpRequest();
      xhr.open("GET", BASE_URL + "get-random-verse/" + currentBook.bible + "/");
      xhr.send();
      xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const data = xhr.response;
          console.log(JSON.parse(data))
          setVerse(JSON.parse(data));
        } else {
          console.log(`Error: ${xhr.status}`);
        }
      };
  }
  }, [currentBook.bible]);

  return (
    <section>
      {verse ? (
        <VerseContainer verse={verse} canva={true}/>
      ) : (
        <Loading />
      )}
    </section>
  );
}

export default RandomVerse;
