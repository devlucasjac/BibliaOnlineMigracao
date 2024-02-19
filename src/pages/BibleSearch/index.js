import { useState, useContext } from "react";

import CurrentBook from "../../context/CurrentBook";
import BibleResults from "../../context/BibleResults";

import ShowVerse from "../../components/BibleComponents/ShowVerse";

function BibleSearch() {
  const { results } = useContext(BibleResults);

  return (
    <div>
      {results &&
        results.map((result) => {
          return <ShowVerse verse={result} />;
        })}
    </div>
  );
}

export default BibleSearch;
