import CardContent from "@mui/material/CardContent";

import ShowVerse from "../ShowVerse";

import parse from "html-react-parser";

import { useContext } from "react";

import Books from "../../../context/Books";
import DarkMode from "../../../context/DarkMode.js";
import CanvasContainer from "../../GeneralComponents/CanvasContainer/index.js";

import { StyledCard, StyledText } from "./style.js";

function VerseContainer({ verse, title, handleClick, canva, justShare}) {
  const { books } = useContext(Books);
  const { isLit } = useContext(DarkMode);

  const cleanVerse = verse.text.replace(/<\/?[^>]+(>|$)/g, "");
  const textImage = parse(`${cleanVerse}
  
  ${findBook(verse.book).name}${verse.chapter}:${verse.verse}`)

  function findBook(bookid) {
    if (books.find((book) => book.bookid === bookid) === undefined) {
      return "livro não encontrado 😢";
    }
    return books.find((book) => book.bookid === bookid);
  }

  return (
    <>
      {verse.verse ? (
        <StyledCard
          onClick={() => {
            handleClick !== undefined && handleClick(verse);
          }}
          isLit={isLit}
        >          
          <CardContent>
            {title && (
                <StyledText isLit={isLit} variant="h5">
                  {title}
                </StyledText>
              )}
            {canva ? <CanvasContainer text={textImage}/>: <>              
              <StyledText isLit={isLit} variant="h6">
                Livro:{findBook(verse.book).name}
              </StyledText>
              <StyledText
                isLit={isLit}
                variant="p"
                sx={{ display: "block", margin: "5px" }}
              >
                Capitulo:{verse.chapter}
              </StyledText>
              <ShowVerse verse={verse} />   
              {justShare && <CanvasContainer text={textImage} justShare={justShare}/>}                       
            </>}                      
          </CardContent>
        </StyledCard>
      ) : (
        <div>Verso não encontrado</div>
      )}
    </>
  );
}

export default VerseContainer;
