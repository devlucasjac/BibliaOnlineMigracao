import { useContext } from "react";

import { useNavigate } from "react-router";

import BibleResults from "../../context/BibleResults";
import CurrentBook from "../../context/CurrentBook";
import SelectedVerse from "../../context/SelectedVerse";

import Loading from "../../components/GeneralComponents/Loading";
import VerseContainer from "../../components/BibleComponents/VerseContainer";

function BibleSearch() {
  const navigate = useNavigate();

  const { results } = useContext(BibleResults);
  const { currentBook, setCurrentBook } = useContext(CurrentBook);
  const { setSelectedVerse} = useContext(SelectedVerse);

  const SendToChap = (result) => {
    navigate("/");
    
    setSelectedVerse({book:result.book,verse:result.verse,
      chapter:result.chapter,text:result.text,translation:result.translation})
    setCurrentBook({
      ...currentBook,
      book: result.book,
      chapterNum: result.chapter,
    });
  };

  return (
    <div>
      {results ? (
        results.map((result) => {
          return <VerseContainer verse={result} handleClick={SendToChap}/>;
        })
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
}

export default BibleSearch;
