import SearchIcon from "@mui/icons-material/Search";

import { useState, useContext } from "react";

import { useNavigate } from "react-router";

import CurrentBook from "../../../context/CurrentBook";
import BibleResults from "../../../context/BibleResults";

import ShowVerse from "../../BibleComponents/ShowVerse";

import { Search, SearchIconWrapper, StyledInputBase } from "./styles";

import { BASE_URL } from "../../../configs";

function SearchBox() {
  const navigate = useNavigate();
  const { currentBook } = useContext(CurrentBook);
  const { setResults } = useContext(BibleResults);

  const [input, setInput] = useState();

  function searchPassages(e) {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      BASE_URL + "find/" + currentBook.bible + "/?search=" + input
    );
    xhr.send();
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = xhr.response;
        console.log(JSON.parse(data));
        setResults(JSON.parse(data));
        navigate("pesquisa/");
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };
  }

  return (
    <Search>
      <form onSubmit={searchPassages}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </form>
    </Search>
  );
}

export default SearchBox;
