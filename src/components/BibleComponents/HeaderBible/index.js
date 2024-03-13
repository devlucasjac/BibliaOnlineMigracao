import { useState, useContext } from "react";

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

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import FontStyle from "../../../context/FontStyle";

function HeaderBible() {
  const [showBibleSelection, setShowBibleSelection] = useState(false);
  const [showBookSelection, setShowBookSelection] = useState(false);
  const [showChapterSelection, setShowChapterSelection] = useState(false);
  const [configAnchorEl, setConfigAnchorEl] = useState(null);

  const isConfigOpen = Boolean(configAnchorEl);

  const { font, setFont } = useContext(FontStyle);

  function saveObjectToCookie(obj) {
    var jsonStr = JSON.stringify(obj);
    console.log(jsonStr);

    document.cookie =
      "fontConfig=" +
      jsonStr +
      "; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/";
  }

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
        <FormControl>
          <FormatSizeIcon
            onClick={handleConfigMenuClose}
            style={{ fontWeight: "lighter" }}
            onMouseEnter={() => {
              console.log("entrou");
            }}
          ></FormatSizeIcon>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            onClick={(e) => {
              setFont({ ...font, size: e.target.value });
              saveObjectToCookie(font);
            }}
          >
            <FormControlLabel
              value="small"
              control={<Radio />}
              label="pequeno"
            />
            <FormControlLabel
              value="medium"
              control={<Radio />}
              label="regular"
            />
            <FormControlLabel value="big" control={<Radio />} label="grande" />
          </RadioGroup>
        </FormControl>
      </MenuItem>
      <MenuItem>
        <FormControl>
          <FormatBoldIcon
            style={{ fontWeight: "bold" }}
            onClick={handleConfigMenuClose}
          ></FormatBoldIcon>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            onClick={(e) => {
              setFont({ ...font, bold: e.target.value });
              saveObjectToCookie(font);
            }}
          >
            <FormControlLabel
              value="ligth"
              control={<Radio />}
              label="delicado"
            />
            <FormControlLabel
              value="medium"
              control={<Radio />}
              label="regular"
            />
            <FormControlLabel
              value="bold"
              control={<Radio />}
              label="negrito"
            />
          </RadioGroup>
        </FormControl>
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
