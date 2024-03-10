import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import Bible from "./pages/Bible/index";
import BibleSearch from "./pages/BibleSearch/index";

import NavBar from "./components/GeneralComponents/NavBar/index";

import { useState, useEffect } from "react";

import CurrentBook from "./context/CurrentBook";
import Books from "./context/Books";
import BibleResults from "./context/BibleResults";
import FontStyle from "./context/FontStyle";

import "./App.css";

function App() {
  const savedBible = window.localStorage.getItem("Bible");
  const savedBook = parseInt(window.localStorage.getItem("Book"));
  const savedChapter = parseInt(window.localStorage.getItem("ChapterNum"));

  const [books, setBooks] = useState();
  const [results, setResults] = useState();
  const [font, setFont] = useState({ size: "", bold: "" });

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

  useEffect(() => {
    console.log("abriu");
  });

  return (
    <>
      <CurrentBook.Provider value={{ currentBook, setCurrentBook }}>
        <Books.Provider value={{ books, setBooks }}>
          <BibleResults.Provider value={{ results, setResults }}>
            <FontStyle.Provider value={{ font, setFont }}>
              <Router>
                <NavBar />
                <Routes>
                  <Route exact path="/" element={<Bible />} />
                  <Route exact path="/pesquisa" element={<BibleSearch />} />
                </Routes>
              </Router>
            </FontStyle.Provider>
          </BibleResults.Provider>
        </Books.Provider>
      </CurrentBook.Provider>
    </>
  );
}

export default App;
