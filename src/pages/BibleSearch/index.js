import { useContext } from "react";

import { useNavigate } from "react-router";

import BibleResults from "../../context/BibleResults";
import CurrentBook from "../../context/CurrentBook";

import Loading from "../../components/GeneralComponents/Loading";
import VerseContainer from "../../components/BibleComponents/VerseContainer";

function BibleSearch() {
  const navigate = useNavigate();

  const { results } = useContext(BibleResults);
  const { currentBook, setCurrentBook } = useContext(CurrentBook);

  const SendToChap = (result) => {
    navigate("/");
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
          return <VerseContainer verse={result} handleClick={SendToChap} />;
        })
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
}

export default BibleSearch;
