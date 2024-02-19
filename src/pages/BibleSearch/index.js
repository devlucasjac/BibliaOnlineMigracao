import { useContext } from "react";

import BibleResults from "../../context/BibleResults";

import Loading from "../../components/GeneralComponents/Loading";
import VerseContainer from "../../components/BibleComponents/VerseContainer";

function BibleSearch() {
  const { results } = useContext(BibleResults);

  return (
    <div>
      {results ? (
        results.map((result) => {
          return <VerseContainer verse={result} />;
        })
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
}

export default BibleSearch;
