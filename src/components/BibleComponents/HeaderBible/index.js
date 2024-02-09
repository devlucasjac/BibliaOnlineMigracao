import { useState } from "react";

import Modal from "@mui/material/Modal";

import BibleSelector from "../BibleSelector/index";
import BookSelector from "../BookSelector/index";
import ChapterSelector from "../ChapterSelector";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";

function HeaderBible() {
  const [showBibleSelection, setShowBibleSelection] = useState(false);
  const [showBookSelection, setShowBookSelection] = useState(false);
  const [showChapterSelection, setShowChapterSelection] = useState(false);

  return (
    <>
      <Button>
        <SettingsIcon></SettingsIcon>
      </Button>
      <Stack spacing={1} direction="row">
        <Button
          onClick={() => setShowBibleSelection(true)}
          size="large"
          variant="outlined"
        >
          Bíblia
        </Button>
        <Modal
          open={showBibleSelection}
          handleClose={() => setShowBibleSelection(false)}
          size="large"
          variant="outlined"
        >
          <>
            <Button onClick={() => setShowBibleSelection(false)}>Fechar</Button>

            <BibleSelector showSelector={setShowBibleSelection} />
          </>
        </Modal>
        <Button
          onClick={() => setShowBookSelection(true)}
          size="large"
          variant="outlined"
        >
          Livro
        </Button>
        <Modal
          open={showBookSelection}
          handleClose={() => setShowBookSelection(false)}
        >
          <>
            <Button onClick={() => setShowBookSelection(false)}>Fechar</Button>
            <BookSelector showSelector={setShowBookSelection} />
          </>
        </Modal>
        <Button
          onClick={() => setShowChapterSelection(true)}
          size="large"
          variant="outlined"
        >
          Capitulo
        </Button>
        <Modal
          open={showChapterSelection}
          handleClose={() => setShowChapterSelection(false)}
        >
          <>
            <Button onClick={() => setShowChapterSelection(false)}>
              Fechar
            </Button>
            <ChapterSelector showSelector={setShowChapterSelection} />
          </>
        </Modal>
      </Stack>
    </>
  );
}

export default HeaderBible;
