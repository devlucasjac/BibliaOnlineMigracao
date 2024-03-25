import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import Bible from "./pages/Bible/index";
import BibleSearch from "./pages/BibleSearch/index";

import NavBar from "./components/GeneralComponents/NavBar/index";

import { useState } from "react";

import CurrentBook from "./context/CurrentBook";
import Books from "./context/Books";
import BibleResults from "./context/BibleResults";
import FontStyle from "./context/FontStyle";
import DarkMode from "./context/DarkMode";

import { GlobalStyle } from "./Style.js";

import "./App.css";

function App() {
  function getObjectFromCookie() {
    var cookieValue = document.cookie.replace(
      /(?:(?:^|.*;\s*)fontConfig\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    return cookieValue ? JSON.parse(cookieValue) : null;
  }

  const savedBible = window.localStorage.getItem("Bible");
  const savedBook = parseInt(window.localStorage.getItem("Book"));
  const savedChapter = parseInt(window.localStorage.getItem("ChapterNum"));

  const fontStyle = getObjectFromCookie();

  const [books, setBooks] = useState();
  const [results, setResults] = useState();
  const [isLit, setIsLit] = useState(true);
  const [font, setFont] = useState(() => {
    if (fontStyle !== null) {
      return fontStyle;
    }
    return { size: "large", bold: "bold" };
  });

  const [currentBook, setCurrentBook] = useState(() => {
    if (savedBible !== null) {
      return {
        bible: savedBible,
        book: savedBook,
        chapterNum: savedChapter,
      };
    }
    return { bible: "ARA", book: 1, chapterNum: 1 };
  });

  return (
    <>
      <CurrentBook.Provider value={{ currentBook, setCurrentBook }}>
        <Books.Provider value={{ books, setBooks }}>
          <BibleResults.Provider value={{ results, setResults }}>
            <FontStyle.Provider value={{ font, setFont }}>
              <DarkMode.Provider value={{ isLit, setIsLit }}>
                <GlobalStyle isLit={isLit} />
                <Router>
                  <NavBar />
                  <Routes>
                    <Route exact path="/" element={<Bible />} />
                    <Route exact path="/pesquisa" element={<BibleSearch />} />
                  </Routes>
                </Router>
              </DarkMode.Provider>
            </FontStyle.Provider>
          </BibleResults.Provider>
        </Books.Provider>
      </CurrentBook.Provider>
    </>
  );
}

export default App;
