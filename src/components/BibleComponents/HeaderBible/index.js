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
          size="small"
          variant="outlined"
        >
          Bíblia
        </Button>
        <Modal
          open={showBibleSelection}
          handleClose={() => setShowBibleSelection(false)}
          size="small"
          variant="outlined"
          sx={{ display: "block", overflowY: "initial" }}
        >
          <>
            <BibleSelector showSelector={setShowBibleSelection} />
          </>
        </Modal>
        <Button
          onClick={() => setShowBookSelection(true)}
          size="small"
          variant="outlined"
        >
          Livro
        </Button>
        <Modal
          open={showBookSelection}
          handleClose={() => setShowBookSelection(false)}
        >
          <BookSelector showSelector={setShowBookSelection} />
        </Modal>
        <Button
          onClick={() => setShowChapterSelection(true)}
          size="small"
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
