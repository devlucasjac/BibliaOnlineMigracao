import { useState } from "react";

import Modal from "@mui/material/Modal";

import BibleSelector from "../BibleSelector/index";
import BookSelector from "../BookSelector/index";
import ChapterSelector from "../ChapterSelector";

function HeaderBible() {
  const [showBibleSelection, setShowBibleSelection] = useState(false);
  const [showBookSelection, setShowBookSelection] = useState(false);
  const [showChapterSelection, setShowChapterSelection] = useState(false);

  return (
    <div>
      <button>configurações</button>

      <button onClick={() => setShowBibleSelection(true)}>Bíblia</button>
      <Modal
        open={showBibleSelection}
        handleClose={() => setShowBibleSelection(false)}
      >
        <>
          <button onClick={() => setShowBibleSelection(false)}>Fechar</button>
          <p>Bibla</p>
          <BibleSelector showSelector={setShowBibleSelection} />
        </>
      </Modal>
      <button onClick={() => setShowBookSelection(true)}>Livro</button>

      <Modal
        open={showBookSelection}
        handleClose={() => setShowBookSelection(false)}
      >
        <>
          <button onClick={() => setShowBookSelection(false)}>Fechar</button>
          <p>Livro</p>
          <BookSelector showSelector={setShowBookSelection} />
        </>
      </Modal>
      <button onClick={() => setShowChapterSelection(true)}>Capitulo</button>
      <Modal
        open={showChapterSelection}
        handleClose={() => setShowChapterSelection(false)}
      >
        <>
          <button onClick={() => setShowChapterSelection(false)}>Fechar</button>
          <ChapterSelector showSelector={setShowChapterSelection} />
        </>
      </Modal>
    </div>
  );
}

export default HeaderBible;
