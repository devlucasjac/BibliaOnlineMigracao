import { useState } from "react";

import Modal from "@mui/material/Modal";

import BibleSelector from "../BibleSelector/index";
import BookSelector from "../BookSelector/index";
import ChapterSelector from "../ChapterSelector";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

function HeaderBible() {
  const [showBibleSelection, setShowBibleSelection] = useState(false);
  const [showBookSelection, setShowBookSelection] = useState(false);
  const [showChapterSelection, setShowChapterSelection] = useState(false);
  const [configAnchorEl, setConfigAnchorEl] = useState(null);

  const isConfigOpen = Boolean(configAnchorEl);

  function handleConfigMenuClose() {
    setConfigAnchorEl(null);
  }

  function handleConfigMenuOpen(e) {
    setConfigAnchorEl(e.currentTarget);
  }

  const renderConfigMenu = (
    <Menu
      anchorEl={configAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isConfigOpen}
      onClose={handleConfigMenuClose}
    >
      <MenuItem>
        <FormatSizeIcon
          onClick={handleConfigMenuClose}
          style={{ fontWeight: "lighter" }}
          onMouseEnter={() => {
            console.log("entrou");
          }}
        ></FormatSizeIcon>
      </MenuItem>
      <MenuItem>
        <FormatBoldIcon
          style={{ fontWeight: "bold" }}
          onClick={handleConfigMenuClose}
          onMouseEnter={() => {
            console.log("entrou");
          }}
        ></FormatBoldIcon>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Button
        onClick={(e) => {
          handleConfigMenuOpen(e);
        }}
      >
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
          <ChapterSelector showSelector={setShowChapterSelection} />
        </Modal>
      </Stack>
      {renderConfigMenu}
    </>
  );
}

export default HeaderBible;
